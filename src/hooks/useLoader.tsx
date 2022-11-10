import { LoaderState } from "@types";
import { useState } from "react";

const ANIM_DELAY = 750; // In milliseconds

export function useLoader() {

    const [loaderState, _setInternalLoaderState] = useState<LoaderState>(LoaderState.Loading)

    function changeLoaderState(newState: LoaderState) {
        if (newState === loaderState) return;

        const element = document.getElementById("loader")

        let _opacity = "1"
        let _transform = "scale(1)"
        let _zIndex = "999999"
        switch (newState) {
            case LoaderState.Loaded:
                _opacity = "0"
                _transform = "scale(150)"
                _zIndex = "-1"
                break;
            case LoaderState.Loading:
            default:
                break;
        }
        setTimeout(() => {
            element!.style.opacity = _opacity
            element!.style.transform = _transform
            element!.style.zIndex = _zIndex
        }, ANIM_DELAY)

        _setInternalLoaderState(newState)
    }

    function toggleLoaderState() {
        return changeLoaderState(loaderState === LoaderState.Loaded ? LoaderState.Loading : LoaderState.Loaded)
    }

    return {
        loaderState,
        changeLoaderState,
        toggleLoaderState
    }

}