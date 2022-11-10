import { Box, Heading } from "@chakra-ui/react";
import { MotionBox } from "@components/MotionBox";
import { IMovie, ITVProgram } from "@types";
import { getImageFullPath } from "@utils/apiUtils";
import { trimStringToLength } from "@utils/stringUtils";
import { useMemo } from "react";

interface ICompactCard {
    item: IMovie | ITVProgram, listIndex?: number, onExpand: any, disabled: boolean
}

export function CompactCard({ item, listIndex, onExpand, disabled }: ICompactCard) {

    /* @ts-ignore - Just a temporal thing */
    const itemTitle = useMemo(()=> trimStringToLength({text: item.title || item.name || "", maxLength: 19}), [item])
    const posterURL = useMemo(() => `url("${getImageFullPath(item.poster_path)}")`, [item])

    return (
        <MotionBox role="group"
            layoutId={`expandable-card-${item.id}`} overflow="hidden" _hover={{
                marginTop: "-20px"
            }} style={{
                transition: "margin-top .4s ease-in-out"
            }} w={"280px"} h={"480px"} display="flex" flexDir="column"
            alignItems="center" justifyContent="center" rowGap={"10px"} position="relative">
            <Box borderRadius={20} pos="absolute" top={"35px"} left={"15px"} w={"250px"} h={"375px"} zIndex={0} bgColor="#a1a1a1" _groupHover={{

            }}></Box>
            <MotionBox
                pos="absolute" top={"35px"} left={"15px"}
                zIndex={1}
                py={0.5} borderRadius={20} display="flex" flexDir="column"
                alignItems="center" justifyContent="center" cursor="pointer"
                minW={"250px"}
                w={"250px"} h={"375px"}
                onClick={disabled ? undefined : onExpand}
                px={0.5}
                bgImage={posterURL}
                bgSize="cover"
                bgRepeat="no-repeat"
                bgPos="center"
                opacity={0.6}
                _groupHover={{
                    boxShadow: "0px 0px 15px 6px rgb(247 187 122 / 80%)",
                    opacity: "1"
                }}
                style={{
                    transition: "box-shadow 1s ease-in-out, opacity .4s ease-in-out"
                }}
            >
            </MotionBox>
            <Box pos="absolute" bottom="20px" w="250px" zIndex="1" display="flex" flexDir="row" justifyContent="center" alignItems="center" transition="bottom .4s ease-in-out" _groupHover={{
                bottom: "10px"
            }}>
                <Heading color="white" as="h2" size="md" fontWeight="medium" margin={0}
                    opacity={disabled ? 0 : 0.6}
                    textAlign="center"
                    className="prevent-select"
                    _groupHover={{
                        paddingTop: "20px",
                        opacity: "1"
                    }}
                    style={{
                        transition: "padding-top .4s ease-in-out, opacity .4s ease-in-out"
                    }}
                >
                    {listIndex !== undefined && (<>
                        {++listIndex}.
                    </>)}{" "}
                    {itemTitle}
                </Heading>
            </Box>
        </MotionBox>
    )
}