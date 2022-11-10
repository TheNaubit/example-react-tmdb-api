import { Heading } from "@chakra-ui/react";
import { MotionBox } from "@components/MotionBox";
import { IMovie, ITVProgram } from "@types";
import { getImageFullPath } from "@utils/apiUtils";
import { trimStringToLength } from "@utils/stringUtils";
import { useMemo } from "react";

interface ISimilarCard {
    item: IMovie | ITVProgram,
    isDark?: boolean
}

export function SimilarCard({ item, isDark }: ISimilarCard) {

    /* @ts-ignore - Just a temporal thing */
    const itemTitle = useMemo(()=> trimStringToLength({text: item.title || item.name || "", maxLength: 12}), [item])
    const posterURL = useMemo(() => `url("${getImageFullPath(item.poster_path)}")`, [item])

    return (
        <MotionBox role="group" w={"125px"} h={"280px"} display="flex" flexDir="column"
            alignItems="center" justifyContent="flex-start" rowGap={"10px"} >
            <MotionBox
                py={0.5} borderRadius={20} display="flex" flexDir="column"
                alignItems="center" justifyContent="center"
                minW={"125px"}
                minH={"187.5px"}
                w={"125px"} h={"187.5px"}
                px={0.5}
                bgImage={posterURL}
                bgSize="cover"
                bgRepeat="no-repeat"
                bgPos="center"
                opacity={0.7}
                style={{
                    transition: "opacity .4s ease-in-out"
                }}
            >
            </MotionBox>
            <Heading color={isDark ? "white" : "black"} as="h4" size="sm" fontWeight="medium" textAlign="center" margin={0}
            opacity={0.7}
                transition="opacity .4s ease-in-out"
            >
                {itemTitle}
            </Heading>
        </MotionBox>
    )
}