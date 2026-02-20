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
import { colors } from "@/app/theme/colors";
import type { ShopFilterOptions, ShopFilters } from "../types";

type ShopFiltersPanelProps = {
  filters: ShopFilters;
  options: ShopFilterOptions;
  resultsCount: number;
  source: "mock" | "woo" | null;
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
  source,
  hasActiveFilters,
  onQueryChange,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
  onClear,
}: ShopFiltersPanelProps) => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        border: "1px solid rgba(55,67,135,0.22)",
        bgcolor: colors.stickerBackground,
        mb: 4,
      }}
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", lg: "flex-end" },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: { xs: "flex-start", lg: "flex-end" },
              flexWrap: "wrap",
            }}
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
              label="Platne"
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
        sx={{ mt: 2, gap: 1, flexWrap: "wrap" }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
            Wyniki: {resultsCount}
          </Typography>
          {source ? (
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Zrodlo danych: {source === "woo" ? "WooCommerce" : "mock"}
              </Typography>
            </Stack>
          ) : null}
        </Stack>

        {hasActiveFilters ? (
          <Button variant="text" onClick={onClear} sx={{ fontWeight: 800 }}>
            Wyczysc filtry
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};

export default ShopFiltersPanel;
