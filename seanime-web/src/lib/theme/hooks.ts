import { Models_Theme } from "@/api/generated/types"
import { useServerStatus } from "@/app/(main)/_hooks/use-server-status"

export const enum ThemeLibraryScreenBannerType {
    Dynamic = "dynamic",
    Custom = "custom",
}

export const enum ThemeMediaPageBannerType {
    Default = "default",
    BlurWhenUnavailable = "blur-when-unavailable",
    HideWhenUnavailable = "hide-when-unavailable",
    Hide = "hide",
}

export const ThemeMediaPageBannerTypeOptions = [
    {
        value: ThemeMediaPageBannerType.Default as string, label: "Default",
        description: "Always show a banner image. If not available, the cover image will be used instead.",
    },
    {
        value: ThemeMediaPageBannerType.BlurWhenUnavailable as string, label: "Blur when unavailable",
        description: "Show the banner image if available. If not available, the cover image will be used and blurred.",
    },
    {
        value: ThemeMediaPageBannerType.HideWhenUnavailable as string, label: "Hide when unavailable",
        description: "Show the banner image if available. If not available, the banner will be hidden.",
    },
    {
        value: ThemeMediaPageBannerType.Hide as string, label: "Hide",
        description: "Always hide the banner image.",
    },
]

export type ThemeSettings = Omit<Models_Theme, "id">
export const THEME_DEFAULT_VALUES: ThemeSettings = {
    enableColorSettings: false,
    animeEntryScreenLayout: "stacked",
    smallerEpisodeCarouselSize: false,
    expandSidebarOnHover: false,
    backgroundColor: "#070707",
    accentColor: "#6152df",
    sidebarBackgroundColor: "#070707",
    hideTopNavbar: false,
    enableMediaCardBlurredBackground: false,
    libraryScreenBannerType: ThemeLibraryScreenBannerType.Dynamic,
    libraryScreenCustomBannerImage: "",
    libraryScreenCustomBannerPosition: "50% 50%",
    libraryScreenCustomBannerOpacity: 100,
    libraryScreenCustomBackgroundImage: "",
    libraryScreenCustomBackgroundOpacity: 10,
    disableLibraryScreenGenreSelector: false,
    libraryScreenCustomBackgroundBlur: "",
    enableMediaPageBlurredBackground: false,
    disableSidebarTransparency: false,
    useLegacyEpisodeCard: false,
    disableCarouselAutoScroll: false,
    mediaPageBannerType: ThemeMediaPageBannerType.Default,
}


export type ThemeSettingsHook = {
    hasCustomBackgroundColor: boolean
} & ThemeSettings

/**
 * Get the current theme settings
 * This hook will return the default values if some values are not set
 */
export function useThemeSettings(): ThemeSettingsHook {
    const serverStatus = useServerStatus()
    return {
        enableColorSettings: getThemeValue("enableColorSettings", serverStatus?.themeSettings),
        animeEntryScreenLayout: getThemeValue("animeEntryScreenLayout", serverStatus?.themeSettings),
        smallerEpisodeCarouselSize: getThemeValue("smallerEpisodeCarouselSize", serverStatus?.themeSettings),
        expandSidebarOnHover: getThemeValue("expandSidebarOnHover", serverStatus?.themeSettings),
        backgroundColor: getThemeValue("backgroundColor", serverStatus?.themeSettings),
        accentColor: getThemeValue("accentColor", serverStatus?.themeSettings),
        hideTopNavbar: getThemeValue("hideTopNavbar", serverStatus?.themeSettings),
        enableMediaCardBlurredBackground: getThemeValue("enableMediaCardBlurredBackground", serverStatus?.themeSettings),
        sidebarBackgroundColor: getThemeValue("sidebarBackgroundColor", serverStatus?.themeSettings),
        libraryScreenBannerType: getThemeValue("libraryScreenBannerType", serverStatus?.themeSettings),
        libraryScreenCustomBannerImage: getThemeValue("libraryScreenCustomBannerImage", serverStatus?.themeSettings),
        libraryScreenCustomBannerPosition: getThemeValue("libraryScreenCustomBannerPosition", serverStatus?.themeSettings),
        libraryScreenCustomBannerOpacity: getThemeValue("libraryScreenCustomBannerOpacity", serverStatus?.themeSettings),
        libraryScreenCustomBackgroundImage: getThemeValue("libraryScreenCustomBackgroundImage", serverStatus?.themeSettings),
        libraryScreenCustomBackgroundOpacity: getThemeValue("libraryScreenCustomBackgroundOpacity", serverStatus?.themeSettings),
        disableLibraryScreenGenreSelector: getThemeValue("disableLibraryScreenGenreSelector", serverStatus?.themeSettings),
        libraryScreenCustomBackgroundBlur: getThemeValue("libraryScreenCustomBackgroundBlur", serverStatus?.themeSettings),
        enableMediaPageBlurredBackground: getThemeValue("enableMediaPageBlurredBackground", serverStatus?.themeSettings),
        disableSidebarTransparency: getThemeValue("disableSidebarTransparency", serverStatus?.themeSettings),
        useLegacyEpisodeCard: getThemeValue("useLegacyEpisodeCard", serverStatus?.themeSettings),
        disableCarouselAutoScroll: getThemeValue("disableCarouselAutoScroll", serverStatus?.themeSettings),
        hasCustomBackgroundColor: !!serverStatus?.themeSettings?.backgroundColor && serverStatus?.themeSettings?.backgroundColor !== THEME_DEFAULT_VALUES.backgroundColor,
        mediaPageBannerType: getThemeValue("mediaPageBannerType", serverStatus?.themeSettings),
    }
}

function getThemeValue(key: string, settings: ThemeSettings | undefined | null): any {
    if (!settings) {
        // @ts-ignore
        return THEME_DEFAULT_VALUES[key]
    }
    const val = (settings as any)[key]
    if (typeof val === "string" && val === "") {
        // @ts-ignore
        return THEME_DEFAULT_VALUES[key]
    } else if (typeof val === "number" && val === 0) {
        // @ts-ignore
        return THEME_DEFAULT_VALUES[key]
    } else {
        return val
    }
}
