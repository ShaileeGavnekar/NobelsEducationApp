import {
  Autocomplete,
  AutocompleteGetTagProps,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FilterOptionsState,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import { CloseOutlined } from "@mui/icons-material";
import { createStyles, makeStyles } from "@mui/styles";
import clsx from "clsx";
import { keyBy, keys, last, pick, set, xor } from "lodash-es";
import React from "react";
import moment from "moment";
import { DatePicker } from "@mui/lab";

export interface FilterItemOption {
  label: React.ReactNode;
  value: any;
}

export type FilterItemValue = Record<string, any>;

export interface FilterItem {
  key: string;
  label: React.ReactNode;
  type: "input" | "radio" | "checkbox" | "date-range";
  options?: FilterItemOption[];
  filterOptions?: Record<string, any>;
}

export interface FilterProps {
  label?: React.ReactNode;
  options: FilterItem[];
  value: FilterItemValue;
  onChange: (e: FilterItemValue) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 240,
    },
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1, 2),
      "& .MuiCardHeader-action": {
        marginTop: 0,
      },
    },
    cardContent: {
      padding: theme.spacing(3, 1, 1),
    },
    cardActions: {
      justifyContent: "flex-end",
    },
    inputRoot: {
      minHeight: 31,
    },
  })
);

// const useStyles = makeStyles(({ spacing, palette: { primary } }: Theme) => ({
//   card: {
//     minWidth: 240,
//   },
//   cardHeader: {
//     backgroundColor: primary.main,
//     color: primary.contrastText,
//     padding: spacing(1, 2),
//     "& .MuiCardHeader-action": {
//       marginTop: 0,
//     },
//   },
//   cardContent: {
//     padding: spacing(3, 1, 1),
//   },
//   cardActions: {
//     justifyContent: "flex-end",
//   },
//   inputRoot: {
//     minHeight: 31,
//   },
// }));

const renderValue = (
  optionMap: Record<string, FilterItem>,
  value: FilterItemValue,
  key: string
): React.ReactNode => {
  switch (optionMap[key].type) {
    case "input":
      return value[key];
    case "radio":
      return optionMap[key]?.options?.find(
        (option) => option.value === value[key]
      )?.label;
    case "checkbox":
      const values = value[key] || [];
      const label = optionMap[key]?.options?.find((option) =>
        values?.includes(option.value)
      )?.label;
      if (values?.length > 1) {
        return <>{label} and others</>;
      }
      return label;
    case "date-range":
      const val = value[key]?.meta;
      switch (val?.type) {
        case "in-the-last":
          return (
            <div>
              in the last {val?.number ?? 1} {val?.ferquency ?? "week"}
              {(val?.number ?? 1) !== 1 ? "s" : ""}
            </div>
          );
        case "is-in-the-next":
          return (
            <div>
              in the next {val?.number ?? 1} {val?.ferquency ?? "week"}
              {(val?.number ?? 1) !== 1 ? "s" : ""}
            </div>
          );
        case "was-before":
          return <div>was before {val.startDate} </div>;
        case "was-on":
          return <div>was on {val.startDate}</div>;
        case "was-more-than":
          return <div>was more than {val.startDate}</div>;
        case "not-in-between":
          return (
            <div>
              is not in between {val.startDate} - {val.startDate}
            </div>
          );
        default:
          return (
            <div>
              is in between {val.startDate} - {val.startDate}
            </div>
          );
      }
  }
  return null;
};

const today = moment().startOf("d").toISOString();

const Filters: React.FC<FilterProps> = ({
  label,
  value: _value,
  onChange,
  options,
}) => {
  const optionMap = keyBy(options, "key");
  console.log(Object.keys(optionMap));
  const mobileView = false;
  const value = pick(_value, keys(optionMap));
  const classes = useStyles();
  const [itemRef, setItemRef] = React.useState<any>(null);
  const [popoverValue, setPopoverValue] = React.useState<any>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<
    FilterItem | null | undefined
  >(null);
  const inputRef = React.useRef<any>();

  React.useEffect(() => {
    if (!activeItem) {
      setPopoverValue(null);
    }
  }, [activeItem]);
  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setTimeout(() => {
      setActiveItem(null);
      setItemRef(null);
    }, 300);
  };
  const handleApply = () => {
    if (activeItem && popoverValue !== undefined && popoverValue !== null) {
      onChange({ ...value, [activeItem.key]: popoverValue });
    }
    handlePopoverClose();
  };
  const handleFormControlChange = (...args: any[]) => {
    switch (activeItem?.type) {
      case "input":
        setPopoverValue(args[0].target.value);
        break;
      case "radio":
        setPopoverValue(args[1]);
        break;
      case "checkbox":
        const newValue = xor(popoverValue, args);
        setPopoverValue(newValue?.length ? newValue : null);
        break;
      case "date-range":
        const { name, value } = args?.[0]?.target ?? {};
        if (name === "meta.number" && value <= 0) {
          return;
        }
        name &&
          setPopoverValue((pop = {}) => {
            const newValue: any = { ...set({ ...pop }, name, value) };
            switch (newValue?.meta?.type) {
              case "in-the-last":
                newValue.startDate = moment(today)
                  .subtract(
                    newValue?.meta?.number ?? 1,
                    newValue?.meta?.frequency ?? "week"
                  )
                  .toISOString();
                newValue.endDate = today;
                newValue.type = "IN_DATE";
                break;
              case "is-in-the-next":
                newValue.startDate = today;
                newValue.endDate = moment(today)
                  .add(
                    newValue?.meta?.number ?? 1,
                    newValue?.meta?.frequenc ?? "week"
                  )
                  .toISOString();
                newValue.type = "IN_DATE";
                break;
              case "was-before":
                newValue.startDate = newValue?.meta?.startDate;
                newValue.endDate = null;
                newValue.type = "LESS_THAN";
                break;
              case "was-on":
                newValue.startDate = newValue?.meta?.startDate;
                newValue.endDate = null;
                newValue.type = "EQUAL";
                break;
              case "was-more-than":
                newValue.startDate = newValue?.meta?.startDate;
                newValue.endDate = null;
                newValue.type = "GREATER_THAN";
                break;
              case "not-in-between":
                newValue.startDate = newValue?.meta?.startDate;
                newValue.endDate = newValue?.meta?.endDate;
                newValue.type = "NOT_IN_DATE";
                break;
              default:
                newValue.startDate = newValue?.meta?.startDate;
                newValue.endDate = newValue?.meta?.endDate;
                newValue.type = "IN_DATE";
            }
            return newValue;
          });
        break;
    }
  };

  const cardContent = () => {
    switch (activeItem?.type) {
      case "input":
        return (
          <Box px={1}>
            <TextField
              fullWidth
              value={popoverValue}
              onChange={handleFormControlChange}
              InputProps={{ autoFocus: true }}
              label={<div>Matches</div>}
            />
          </Box>
        );
      case "radio":
        return (
          <RadioGroup value={popoverValue} onChange={handleFormControlChange}>
            {activeItem?.options?.map((o, i) => (
              <FormControlLabel
                value={o.value}
                key={i}
                control={<Radio autoFocus={i === 0} />}
                label={o.label as string}
              />
            ))}
          </RadioGroup>
        );
      case "checkbox":
        return (
          <FormGroup>
            {activeItem?.options?.map((o, i) => {
              const checked = popoverValue?.includes(o.value);
              return (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => handleFormControlChange(o.value)}
                      autoFocus={i === 0}
                    />
                  }
                  label={o.label as string}
                />
              );
            })}
          </FormGroup>
        );
      case "date-range":
        const hideDp = ["in-the-last", "is-in-the-next"].includes(
          popoverValue?.meta?.type
        );
        const hideEd = [
          "was-before",
          "was-after",
          "was-on",
          "was-more-than",
        ].includes(popoverValue?.meta?.type);
        return (
          <Box px={1} maxWidth={240}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  defaultValue="between"
                  value={popoverValue?.meta?.type}
                  name="meta.type"
                  onChange={handleFormControlChange}
                  select
                  variant="outlined"
                  size="small"
                  margin="none"
                  fullWidth
                >
                  {!activeItem?.filterOptions?.disabledPast && (
                    <MenuItem value="in-the-last">
                      <div>In the last</div>
                    </MenuItem>
                  )}
                  {!activeItem?.filterOptions?.disableFuture && (
                    <MenuItem value="is-in-the-next">
                      <div>Is in the next</div>
                    </MenuItem>
                  )}
                  <MenuItem value="was-before">
                    <div>Was before</div>
                  </MenuItem>
                  <MenuItem value="was-after">
                    <div>Was after</div>
                  </MenuItem>
                  <MenuItem value="was-on">
                    <div>Was on</div>
                  </MenuItem>
                  <MenuItem value="was-more-than">
                    <div>Was more than</div>
                  </MenuItem>
                  <MenuItem value="between">
                    <div>Between</div>
                  </MenuItem>
                  <MenuItem value="not-in-between">
                    <div>Not in between</div>
                  </MenuItem>
                </TextField>
              </Grid>
              {hideDp && (
                <>
                  <Grid item xs={5}>
                    <TextField
                      defaultValue={1}
                      type="number"
                      name="meta.number"
                      value={popoverValue?.meta?.number}
                      onChange={handleFormControlChange}
                      variant="outlined"
                      size="small"
                      margin="none"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      defaultValue="week"
                      select
                      name="meta.frequency"
                      value={popoverValue?.meta?.frequency}
                      onChange={handleFormControlChange}
                      variant="outlined"
                      size="small"
                      margin="none"
                      fullWidth
                    >
                      <MenuItem value="day">
                        {popoverValue?.meta?.number}
                      </MenuItem>
                      <MenuItem value="week">
                        {popoverValue?.meta?.number}
                      </MenuItem>
                      <MenuItem value="month">
                        {popoverValue?.meta?.number}
                      </MenuItem>
                      <MenuItem value="year">
                        {popoverValue?.meta?.number}
                      </MenuItem>
                    </TextField>
                  </Grid>
                </>
              )}
              {!hideDp && (
                <>
                  <Grid item xs={12}>
                    <DatePicker
                      label={hideEd ? <div>Date</div> : <div>Start Date</div>}
                      value={popoverValue?.meta?.startDate || null}
                      onChange={(date: any) =>
                        handleFormControlChange({
                          target: {
                            name: "meta.startDate",
                            value: date.toISOString(),
                          },
                        })
                      }
                      disablePast={activeItem?.filterOptions?.disabledPast}
                      disableFuture={activeItem?.filterOptions?.disableFuture}
                      renderInput={(props: any) => (
                        <TextField
                          {...props}
                          helperText=""
                          variant="outlined"
                          size="small"
                          margin="none"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  {!hideEd && (
                    <>
                      <Grid style={{ padding: 0 }} item xs={12}>
                        <Box textAlign="center">
                          <Typography color="textSecondary" variant="body2">
                            <div>to</div>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker
                          minDate={popoverValue?.meta?.startDate || null}
                          label={<div>End Date</div>}
                          value={popoverValue?.meta?.endDate || null}
                          onChange={(date: any) =>
                            handleFormControlChange({
                              target: {
                                name: "meta.endDate",
                                value: date.toISOString(),
                              },
                            })
                          }
                          disablePast={activeItem?.filterOptions?.disabledPast}
                          disableFuture={
                            activeItem?.filterOptions?.disableFuture
                          }
                          renderInput={(props: any) => (
                            <TextField
                              {...props}
                              helperText=""
                              variant="outlined"
                              size="small"
                              margin="none"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Box>
        );
    }
    return null;
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
    const inputValue = inputRef.current.value;
    const li = last(newValue);
    const acItem: FilterItem | null = li ? optionMap[li] : null;
    if (inputValue && acItem) {
      onChange({ ...value, [acItem.key]: inputValue });
    } else if (newValue?.length > keys(value)?.length) {
      setActiveItem(acItem);
      setPopoverOpen(true);
    } else {
      onChange(pick(value, newValue));
    }
  };
  const handleFilter = (options: string[], state: FilterOptionsState<any>) =>
    state.inputValue
      ? options.filter((o) => optionMap[o].type === "input")
      : options;
  const handleEdit = (o: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const acItem: FilterItem | null = o ? optionMap[o] : null;
    if (acItem) {
      setItemRef(e.currentTarget);
      setActiveItem(acItem);
      setPopoverValue(value[o]);
      setPopoverOpen(true);
    }
  };

  const autocompleteProps: AutocompleteProps<string, true, false, false> = {
    multiple: true,
    filterOptions: handleFilter,
    // renderOption: (
    //   props: any,
    //   option: string,
    //   state: AutocompleteRenderOptionState
    // ) => <>{props}</>,
    onChange: handleChange,
    filterSelectedOptions: true,
    value: Object.keys(value),
    options: Object.keys(optionMap),
    renderInput: (params: AutocompleteRenderInputParams) => {
      const startAdornment = (
        <>
          {!mobileView && (
            <InputAdornment tabIndex={0} position="start">
              {label}
            </InputAdornment>
          )}{" "}
          {params.InputProps.startAdornment}
        </>
      );
      const textFieldProps: TextFieldProps = {
        ...params,
        InputProps: {
          ...params.InputProps,
          disableUnderline: true,
          startAdornment,
          className: clsx(params.InputProps.className, classes.inputRoot),
          "aria-describedby": "aria-popover-description",
        },
        variant: "standard",
        placeholder: `Type to search...`,
        inputRef,
      };
      return <TextField {...textFieldProps} />;
    },
    renderTags: (tags: string[], getTagProps: AutocompleteGetTagProps) =>
      tags.map((o: string, i: number) => {
        const label = (
          <>
            {optionMap[o].label}: "{renderValue(optionMap, value, o)}"
          </>
        );
        return (
          <Chip
            {...getTagProps({ index: i })}
            onClick={handleEdit(o)}
            size="small"
            label={label}
          />
        );
      }),
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const needToFocus = false;
    if (needToFocus && event.code.startsWith("Key")) {
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    document
      .querySelectorAll(".MuiChip-root")
      .forEach((el) => el.setAttribute("tabindex", "0"));
  });

  return (
    <>
      <Popover
        disableRestoreFocus
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={itemRef || inputRef.current}
        disableEnforceFocus={true}
        id="aria-popover-description"
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            titleTypographyProps={{ variant: "body1" }}
            title={activeItem?.label}
            action={
              <Tooltip title={<div>Close</div>}>
                <IconButton
                  color="inherit"
                  onClick={handlePopoverClose}
                  aria-label={"Close"}
                >
                  <CloseOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent className={classes.cardContent}>
            {cardContent()}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button onClick={handleApply} color="primary">
              <div>Apply</div>
            </Button>
          </CardActions>
        </Card>
      </Popover>
      <Autocomplete
        // renderOption={(props, option) => [props, option]}
        {...autocompleteProps}
      />
    </>
  );
};

export default Filters;
