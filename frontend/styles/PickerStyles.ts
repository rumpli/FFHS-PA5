import { useMemo } from 'react';
import { usePlatformStyles } from '@/hooks/usePlatformStyles';

/**
 * Hook to create dynamic styles based on platform.
 * Ensures hydration issues are avoided by waiting for platform to be set.
 * @returns {object} Styles object
 */
export const usePickerStyles = () => {
    const { platform } = usePlatformStyles();

    const PickerStyles = useMemo(() => {
        if (!platform) {
            // Return placeholder styles until platform is known
            return {
                pickSelection: {
                    flex: 1,
                    flexDirection: 'column',
                },
                picker: {
                    flex: 1,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingLeft: 2,
                    marginRight: 20,
                    marginLeft: 10,
                    height: 30,
                },
            };
        }

        return {
            pickSelection: {
                flex: 1,
                flexDirection: platform === 'web' ? "row" : "column",
            },
            picker: {
                flex: 1,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 2,
                marginRight: 20,
                marginLeft: 10,
                height: 30,
            },
        };
    }, [platform]);

    return PickerStyles;
};
