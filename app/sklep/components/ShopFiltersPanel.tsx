import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { ShopFilterOptions, ShopFilters } from "../types";
import { shopFiltersPanelStyles } from "./ShopFiltersPanel.styles";

type ShopFiltersPanelProps = {
  filters: ShopFilters;
  options: ShopFilterOptions;
  resultsCount: number;
  hasActiveFilters: boolean;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: ShopFilters["price"]) => void;
  onClear: () => void;
};

const selectMenuProps = { disableScrollLock: true };

const ShopFiltersPanel = ({
  filters,
  options,
  resultsCount,
  hasActiveFilters,
  onQueryChange,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
  onClear,
}: ShopFiltersPanelProps) => {
  return (
    <Box
      sx={shopFiltersPanelStyles.panel}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            label="Szukaj"
            value={filters.query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="np. speaking, exam, worksheet"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="shop-category-label">Kategoria</InputLabel>
            <Select
              MenuProps={selectMenuProps}
              labelId="shop-category-label"
              label="Kategoria"
              value={filters.category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <MenuItem value="all">Wszystkie</MenuItem>
              {options.categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="shop-level-label">Poziom</InputLabel>
            <Select
              MenuProps={selectMenuProps}
              labelId="shop-level-label"
              label="Poziom"
              value={filters.level}
              onChange={(event) => onLevelChange(event.target.value)}
            >
              <MenuItem value="all">Wszystkie</MenuItem>
              {options.levels.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, lg: 4 }}
          sx={shopFiltersPanelStyles.priceFilterGridItem}
        >
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={shopFiltersPanelStyles.priceFilterStack}
          >
            <Chip
              label="Wszystkie"
              color={filters.price === "all" ? "secondary" : "default"}
              onClick={() => onPriceChange("all")}
              clickable
            />
            <Chip
              label="Darmowe"
              color={filters.price === "free" ? "secondary" : "default"}
              onClick={() => onPriceChange("free")}
              clickable
            />
            <Chip
              label="Płatne"
              color={filters.price === "paid" ? "secondary" : "default"}
              onClick={() => onPriceChange("paid")}
              clickable
            />
          </Stack>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={shopFiltersPanelStyles.summaryRow}
      >
        <Stack direction="row" spacing={1.5} sx={shopFiltersPanelStyles.summaryLeftStack}>
          <Typography sx={shopFiltersPanelStyles.resultsLabel}>
            Wyniki: {resultsCount}
          </Typography>
        </Stack>

        <Button
          variant="text"
          onClick={onClear}
          sx={[
            shopFiltersPanelStyles.clearButton,
            !hasActiveFilters && shopFiltersPanelStyles.clearButtonHidden,
          ]}
        >
          Wyczyść filtry
        </Button>
      </Stack>
    </Box>
  );
};

export default ShopFiltersPanel;
