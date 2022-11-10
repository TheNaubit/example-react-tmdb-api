import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { Direction } from "@types";
import { useMemo } from "react";

interface IListMoveButton {
    direction: Direction,
    onClick?: (direction: Direction) => void,
    currentFirstItemIndex: number,
    listMaxItem: number,
    mt?: number | string
}

export function ListMoveButton({ direction, onClick, mt, currentFirstItemIndex, listMaxItem }: IListMoveButton) {

    const arrowIcon = useMemo(() => direction === Direction.Backward ? <ArrowBackIcon /> : <ArrowForwardIcon />, [direction])
    const shouldShowIcon = useMemo(() => {
        if(direction === Direction.Backward && currentFirstItemIndex > 0) return true;
        if(direction === Direction.Forward && currentFirstItemIndex + 2 < listMaxItem) return true;

        return false;
    }, [currentFirstItemIndex, direction, listMaxItem])

    function _onClick() {
        if (typeof onClick === "function") onClick(direction)
    }

    return (
        <IconButton visibility={shouldShowIcon ? "visible" : "hidden"} mt={mt} variant="unstyled" aria-label="" icon={arrowIcon} onClick={_onClick} size="lg" transform="scale(1.5)" color="white" opacity={0.4} _hover={{
            transform: "scale(2)",
            opacity: 1
        }} transition={"transform .4s ease-in-out, opacity .4s ease-in-out, visibility .4s ease-in-out"} />
    )
}