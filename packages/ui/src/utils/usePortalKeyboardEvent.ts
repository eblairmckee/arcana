import { useCallback, useEffect } from "react";

type KeyboardEventHandler = (event: KeyboardEvent) => void;

type KeyboardEventOptions = {
  /**
   * Whether the event should be active
   */
  isActive?: boolean;
  /**
   * Whether to prevent body scroll when active
   * @default false
   */
  preventScroll?: boolean;
};

/**
 * Hook for handling keyboard events within portals
 * @param eventMap - Map of keyboard events to their handlers
 * @param options - Options for the keyboard events
 * @example
 * ```tsx
 * const handleKeyboardEvents = usePortalKeyboardEvent({
 *   Escape: onClose,
 *   Enter: onConfirm,
 * }, { isActive: isOpen });
 * ```
 */
export const usePortalKeyboardEvent = (
  eventMap: Record<string, KeyboardEventHandler>,
  { isActive = true, preventScroll = false }: KeyboardEventOptions = {}
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const handler = eventMap[event.key];
      if (handler) {
        handler(event);
      }
    },
    [eventMap]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleKeyDown);
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (preventScroll) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isActive, handleKeyDown, preventScroll]);
};
