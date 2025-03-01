export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveSize = number | `${Breakpoint}:${number}`;

type SizeKey =
  | "12"
  | "16"
  | "18"
  | "20"
  | "24"
  | "32"
  | "36"
  | "40"
  | "42"
  | "48"
  | "64"
  | "72";

// These constants help Tailwind identify the classes during compilation
const BASE_SIZES: Record<SizeKey, string> = {
  "12": "h-[12px] w-[12px]",
  "16": "h-[16px] w-[16px]",
  "18": "h-[18px] w-[18px]",
  "20": "h-[20px] w-[20px]",
  "24": "h-[24px] w-[24px]",
  "32": "h-[32px] w-[32px]",
  "36": "h-[36px] w-[36px]",
  "40": "h-[40px] w-[40px]",
  "42": "h-[42px] w-[42px]",
  "48": "h-[48px] w-[48px]",
  "64": "h-[64px] w-[64px]",
  "72": "h-[72px] w-[72px]"
};

const RESPONSIVE_SIZES: Record<Breakpoint, Record<SizeKey, string>> = {
  sm: {
    "12": "sm:h-[12px] sm:w-[12px]",
    "16": "sm:h-[16px] sm:w-[16px]",
    "18": "sm:h-[18px] sm:w-[18px]",
    "20": "sm:h-[20px] sm:w-[20px]",
    "24": "sm:h-[24px] sm:w-[24px]",
    "32": "sm:h-[32px] sm:w-[32px]",
    "36": "sm:h-[36px] sm:w-[36px]",
    "40": "sm:h-[40px] sm:w-[40px]",
    "42": "sm:h-[42px] sm:w-[42px]",
    "48": "sm:h-[48px] sm:w-[48px]",
    "64": "sm:h-[64px] sm:w-[64px]",
    "72": "sm:h-[72px] sm:w-[72px]"
  },
  md: {
    "12": "md:h-[12px] md:w-[12px]",
    "16": "md:h-[16px] md:w-[16px]",
    "18": "md:h-[18px] md:w-[18px]",
    "20": "md:h-[20px] md:w-[20px]",
    "24": "md:h-[24px] md:w-[24px]",
    "32": "md:h-[32px] md:w-[32px]",
    "36": "md:h-[36px] md:w-[36px]",
    "40": "md:h-[40px] md:w-[40px]",
    "42": "md:h-[42px] md:w-[42px]",
    "48": "md:h-[48px] md:w-[48px]",
    "64": "md:h-[64px] md:w-[64px]",
    "72": "md:h-[72px] md:w-[72px]"
  },
  lg: {
    "12": "lg:h-[12px] lg:w-[12px]",
    "16": "lg:h-[16px] lg:w-[16px]",
    "18": "lg:h-[18px] lg:w-[18px]",
    "20": "lg:h-[20px] lg:w-[20px]",
    "24": "lg:h-[24px] lg:w-[24px]",
    "32": "lg:h-[32px] lg:w-[32px]",
    "36": "lg:h-[36px] lg:w-[36px]",
    "40": "lg:h-[40px] lg:w-[40px]",
    "42": "lg:h-[42px] lg:w-[42px]",
    "48": "lg:h-[48px] lg:w-[48px]",
    "64": "lg:h-[64px] lg:w-[64px]",
    "72": "lg:h-[72px] lg:w-[72px]"
  },
  xl: {
    "12": "xl:h-[12px] xl:w-[12px]",
    "16": "xl:h-[16px] xl:w-[16px]",
    "18": "xl:h-[18px] xl:w-[18px]",
    "20": "xl:h-[20px] xl:w-[20px]",
    "24": "xl:h-[24px] xl:w-[24px]",
    "32": "xl:h-[32px] xl:w-[32px]",
    "36": "xl:h-[36px] xl:w-[36px]",
    "40": "xl:h-[40px] xl:w-[40px]",
    "42": "xl:h-[42px] xl:w-[42px]",
    "48": "xl:h-[48px] xl:w-[48px]",
    "64": "xl:h-[64px] xl:w-[64px]",
    "72": "xl:h-[72px] xl:w-[72px]"
  },
  "2xl": {
    "12": "2xl:h-[12px] 2xl:w-[12px]",
    "16": "2xl:h-[16px] 2xl:w-[16px]",
    "18": "2xl:h-[18px] 2xl:w-[18px]",
    "20": "2xl:h-[20px] 2xl:w-[20px]",
    "24": "2xl:h-[24px] 2xl:w-[24px]",
    "32": "2xl:h-[32px] 2xl:w-[32px]",
    "36": "2xl:h-[36px] 2xl:w-[36px]",
    "40": "2xl:h-[40px] 2xl:w-[40px]",
    "42": "2xl:h-[42px] 2xl:w-[42px]",
    "48": "2xl:h-[48px] 2xl:w-[48px]",
    "64": "2xl:h-[64px] 2xl:w-[64px]",
    "72": "2xl:h-[72px] 2xl:w-[72px]"
  }
};

const getSizeKey = (size: number): SizeKey | undefined => {
  return String(size) as SizeKey;
};

export const getResponsiveSize = (
  size: ResponsiveSize | ResponsiveSize[] | undefined,
  baseSize: number = 24
): {
  responsiveSizeClasses: string;
  responsiveSizeStyles: Record<string, string>;
} => {
  const classes: string[] = [];
  const styles: Record<string, string> = {};

  // If no size provided, use baseSize
  if (size === undefined) {
    const key = getSizeKey(baseSize);
    if (key) {
      classes.push(BASE_SIZES[key]);
    } else {
      styles.height = `${baseSize}px`;
      styles.width = `${baseSize}px`;
    }
  }

  // If size is a number, use that directly
  if (typeof size === "number") {
    const key = getSizeKey(size);
    if (key) {
      classes.push(BASE_SIZES[key]);
    } else {
      styles.height = `${size}px`;
      styles.width = `${size}px`;
    }
  }

  // If array of responsive sizes, generate responsive classes
  if (Array.isArray(size)) {
    const baseKey = getSizeKey(baseSize);
    const responsiveClasses = [
      (baseKey && BASE_SIZES[baseKey]) || `h-[${baseSize}px] w-[${baseSize}px]`
    ];

    size.forEach((s) => {
      if (typeof s === "string") {
        const [breakpoint, valueStr] = s.split(":") as [Breakpoint, string];
        const value = parseInt(valueStr, 10);
        const key = getSizeKey(value);
        classes.push(
          (key && RESPONSIVE_SIZES[breakpoint]?.[key]) ||
            `${breakpoint}:h-[${value}px] ${breakpoint}:w-[${value}px]`
        );
      }
    });

    classes.push(...responsiveClasses);
  }

  if (typeof size === "string") {
    const [breakpoint, valueStr] = size.split(":") as [Breakpoint, string];
    const value = parseInt(valueStr, 10);
    const valueKey = getSizeKey(value);
    classes.push(
      (valueKey && RESPONSIVE_SIZES[breakpoint]?.[valueKey]) ||
        `${breakpoint}:h-[${value}px] ${breakpoint}:w-[${value}px]`
    );
  }

  return {
    responsiveSizeClasses: classes.join(" "),
    responsiveSizeStyles: styles
  };
};
