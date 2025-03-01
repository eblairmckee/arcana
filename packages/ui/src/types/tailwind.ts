// Base types
export type ColorShade =
  | "0"
  | "5"
  | "10"
  | "15"
  | "20"
  | "25"
  | "30"
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "DEFAULT";

// Specific shade types for each color category
export type BackgroundShades = Pick<
  Record<ColorShade, string>,
  "0" | "50" | "100"
>;
export type PrimaryShades = Pick<
  Record<ColorShade, string>,
  "50" | "100" | "DEFAULT"
>;
export type SecondaryShades = Pick<
  Record<ColorShade, string>,
  "50" | "100" | "200" | "300" | "400" | "500" | "600" | "DEFAULT"
>;
export type TertiaryShades = Pick<
  Record<ColorShade, string>,
  "5" | "10" | "15" | "20" | "25" | "30"
>;
export type StrokeShades = Pick<Record<ColorShade, string>, "DEFAULT">;

// Main Colors type
export type Colors = {
  background: BackgroundShades;
  primary: PrimaryShades;
  secondary: SecondaryShades;
  tertiary: TertiaryShades;
  stroke: StrokeShades;
  // Base colors
  white: string;
  "primary-blue": string;
  disabled: string;
  danger: string;
  overlay: string;
  sidebarOverlay: string;
  border: string;
};

// typography types
export type HeadingSize = "xl" | "lg" | "md" | "sm" | "xs";

export type BodySize =
  | "lg"
  | "lg-semibold"
  | "md"
  | "default"
  | "default-medium"
  | "default-semibold"
  | "default-bold"
  | "xs"
  | "xs-medium"
  | "xs-bold"
  | "xxs"
  | "xxs-medium"
  | "xxs-semibold"
  | "xxs-bold";

export type LabelSize = "default";

// Define the categories
export type TypographyCategory = "heading" | "body" | "label";

// Create a mapping type for category to size
export type TypographyCategoryToSize = {
  heading: HeadingSize;
  body: BodySize;
  label: LabelSize;
};

// Create the final variant type using template literals
export type TypographyVariant = {
  [Category in keyof TypographyCategoryToSize]: `${Category}-${TypographyCategoryToSize[Category]}`;
}[keyof TypographyCategoryToSize];

// Update your Typography type to be more specific
export type Typography = {
  heading: Record<HeadingSize, TypographyConfig>;
  body: Record<BodySize, TypographyConfig>;
  label: Record<LabelSize, TypographyConfig>;
};

// Helper type for the config
export type TypographyConfig = {
  fontSize: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontWeight: string;
  textTransform?: string;
};

export type IconColors =
  | "primary"
  | "secondary"
  | "white"
  | "primaryBlue"
  | "disabled"
  | "danger";
