const Breakpoints = {
    //Only max screens
    $screen_max_xs_s: 480,
    $screen_max_xs: 576,
    $screen_max_sm: 767,
    $screen_max_md: 991,
    $screen_max_lg: 1200,
    $screen_max_xl: 1400,

    //Only min screens
    $screen_min_xs_s: 481,
    $screen_min_xs: 577,
    $screen_min_sm: 768,
    $screen_min_md: 992,
    $screen_min_lg: 1201,
    $screen_min_xl: 1401,
}
export const MediaQuery = {
    up (content) {
        return {
            xss: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs_s}px)`]: {
                    ...content
                }
            }, xs: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs}px)`]: {
                    ...content
                }
            }, sm: {
                [`@media (min-width: ${Breakpoints.$screen_min_sm}px)`]: {
                    ...content
                }
            }, md: {
                [`@media (min-width: ${Breakpoints.$screen_min_md}px)`]: {
                    ...content
                }
            }, lg: {
                [`@media (min-width: ${Breakpoints.$screen_min_lg}px)`]: {
                    ...content
                }
            }, xl: {
                [`@media (min-width: ${Breakpoints.$screen_min_xl}px)`]: {
                    ...content
                }
            }
        }
    },
    down (content) {
        return {
            xss: {
                [`@media (max-width: ${Breakpoints.$screen_max_xs_s}px)`]: {
                    ...content
                }
            }, xs: {
                [`@media (max-width: ${Breakpoints.$screen_max_xs}px)`]: {
                    ...content
                }
            }, sm: {
                [`@media (max-width: ${Breakpoints.$screen_max_sm}px)`]: {
                    ...content
                }
            }, md: {
                [`@media (max-width: ${Breakpoints.$screen_max_md}px)`]: {
                    ...content
                }
            }, lg: {
                [`@media (max-width: ${Breakpoints.$screen_max_lg}px)`]: {
                    ...content
                }
            }, xl: {
                [`@media (max-width: ${Breakpoints.$screen_max_xl}px)`]: {
                    ...content
                }
            }
        }
    },
    between (content) {
        return {
            xss_xs: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs_s}px) and (max-width: ${Breakpoints.$screen_max_xs}px)`]: {
                    ...content
                }
            }, xss_sm: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs_s}px) and (max-width: ${Breakpoints.$screen_max_sm}px)`]: {
                    ...content
                }
            }, xss_md: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs_s}px) and (max-width: ${Breakpoints.$screen_max_md}px)`]: {
                    ...content
                }
            }, xs_sm: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs}px) and (max-width: ${Breakpoints.$screen_max_sm}px)`]: {
                    ...content
                }
            }, xs_md: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs}px) and (max-width: ${Breakpoints.$screen_max_md}px)`]: {
                    ...content
                }
            }, xs_lg: {
                [`@media (min-width: ${Breakpoints.$screen_min_xs}px) and (max-width: ${Breakpoints.$screen_max_lg}px)`]: {
                    ...content
                }
            }, sm_md: {
                [`@media (min-width: ${Breakpoints.$screen_min_sm}px) and (max-width: ${Breakpoints.$screen_max_md}px)`]: {
                    ...content
                }
            }, sm_lg: {
                [`@media (min-width: ${Breakpoints.$screen_min_sm}px) and (max-width: ${Breakpoints.$screen_max_lg}px)`]: {
                    ...content
                }
            }, sm_xl: {
                [`@media (min-width: ${Breakpoints.$screen_min_sm}px) and (max-width: ${Breakpoints.$screen_max_xl}px)`]: {
                    ...content
                }
            }, md_lg: {
                [`@media (min-width: ${Breakpoints.$screen_min_md}px) and (max-width: ${Breakpoints.$screen_max_lg}px)`]: {
                    ...content
                }
            }, md_xl: {
                [`@media (min-width: ${Breakpoints.$screen_min_md}px) and (max-width: ${Breakpoints.$screen_max_xl}px)`]: {
                    ...content
                }
            }, lg_xl: {
                [`@media (min-width: ${Breakpoints.$screen_min_lg}px) and (max-width: ${Breakpoints.$screen_max_xl}px)`]: {
                    ...content
                }
            },
        }
    }
}