import { getSimilarMovies, getSimilarTVPrograms } from "@api";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { MotionBox } from "@components/MotionBox";
import { SimilarCardLoader } from "@components/SimilarCardLoader";
import { useQuery } from "@tanstack/react-query";
import { ContentType, IMovie, ITVProgram } from "@types";
import { useEffect, useMemo, useState } from "react";

import loadable from "@loadable/component"
import { trimStringToLength } from "@utils/stringUtils";
import { getImageFullPath, getURLWithoutCORS } from "@utils/apiUtils";
import { FastAverageColor } from "fast-average-color";
import { mergeColors, rgbStringToStruct, rgbStructToString } from "@utils/colorUtils";

const SimilarCard = loadable(() => import("@components/SimilarCard"), {
    resolveComponent: (components) => components.SimilarCard,
})

const fac = new FastAverageColor()

interface IDetailsCard {
    item: IMovie | ITVProgram,
    onCollapse: any,
    contentType: ContentType,
}

export function DetailsCard({ item, onCollapse, contentType }: IDetailsCard) {

    const toast = useToast()

    // If we need extra details of the movie / series we could use this query, but for this example we don't really need it
    /*const { isFetching: isFetchingContentDetails, isLoading: isLoadingContentDetails, data: dataContentDetails, error: errorContentDetails } = useQuery({
        queryKey: ["content-details"], queryFn: () => {
            if (contentType === ContentType.Movie) return getMovieDetails({ id: item.id })
            if (contentType === ContentType.TV) return getTVProgramDetails({ id: item.id })
        }
    })*/

    const { isFetching: isFetchingSimilarContent, isLoading: isLoadingSimilarContent, data: dataSimilarContent, error: errorSimilarContent } = useQuery({
        /* @ts-ignore - Just a temporal thing */
        queryKey: ["similar-content"], queryFn: () => {
            if (contentType === ContentType.Movie) return getSimilarMovies({ id: item.id })
            if (contentType === ContentType.TV) return getSimilarTVPrograms({ id: item.id })
        }
    })

    /* @ts-ignore - Just a temporal thing */
    const itemOverview = useMemo(() => trimStringToLength({ text: item.overview || "", maxLength: 480 }), [item])
    const posterURL = useMemo(() => `url("${getImageFullPath(item.poster_path)}")`, [item])
    const backdropURL = useMemo(() => `url("${getImageFullPath(item.backdrop_path)}")`, [item])

    const [backColor, setBackColor] = useState("rgba( 255, 255, 255, 0.90)")
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const _getImageColor = async () => {
            const c = await fac.getColorAsync(getURLWithoutCORS(getImageFullPath(item.backdrop_path)))

            let rgbaColor = rgbStringToStruct(c.rgba)
            const baseColor = rgbStringToStruct("rgba( 255, 255, 255, 0.90)")

            rgbaColor.alpha = 0.3

            setIsDark(c.isDark)
            setBackColor(rgbStructToString(mergeColors(baseColor, rgbaColor, { mergeRed: true, mergeGreen: true, mergeBlue: true })))
        }

        _getImageColor()
    }, [item])


    useEffect(() => {
        if (errorSimilarContent) {
            toast({
                title: "😥 Something happened...",
                description: "We had issues loading similar content, please try again later!",
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "top-right"
            })
        }

    }, [errorSimilarContent])


    return (
        <MotionBox layoutId={`expandable-card-${item.id}`} className="expanded" w="100vw" h="100vh" pos="absolute" top={0} left={0} zIndex="3">
            <Box pos="absolute" top={0} left={0} zIndex={4} w="100vw" h="100vh"
                onClick={onCollapse} cursor="pointer" backdropFilter="blur(6px)">
            </Box>
            <Box pos="absolute" top={0} left={0} zIndex={5} w="100vw" h="100vh" onClick={onCollapse} cursor="pointer"
                display="flex" flexDir="row" justifyContent="center" alignItems="center">
                <Box w="100%" h="100%" maxW="1000px" maxH="652.5px" bgColor={backColor} cursor="default" borderRadius="24px" px={10} py={10} display="flex" flexDir="row"
                    alignItems="flex-start" justifyContent="flex-start" columnGap={12} border={`1px solid ${backColor}`} backdropFilter="blur(4px)" boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
                    pos="relative"
                    _before={{
                        content: "' '",
                        display: "block",
                        position: "absolute",
                        left: "0",
                        top: "-1px",
                        width: "100%",
                        height: "100.2%",
                        opacity: "0.08",
                        backgroundImage: backdropURL,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 0",
                        backgroundSize: "cover",
                        borderRadius: "24px"
                    }}>
                    <Box w="375px" h="562.5px" borderRadius="16px" bgImage={posterURL}
                        bgSize="cover"
                        bgRepeat="no-repeat"
                        bgPos="center"
                        boxShadow={"0px 0px 15px 2px rgba(0,0,0,0.5)"}
                    >
                    </Box>
                    <Box w="calc(100% - 375px)">
                        <Box display="flex" flexDir="row"
                            alignItems="flex-start" justifyContent="space-between">
                            <Box display="flex" flexDir="row"
                                alignItems="center" justifyContent="flex-start" columnGap={3}>
                                {/* @ts-ignore - Just a temporal thing */}
                                <Heading as={"h2"} size="lg" color={isDark ? "white" : "black"}>{item?.title || item?.name}</Heading>
                                {/* @ts-ignore - Just a temporal thing */}
                                {item.adult === true && <Badge colorScheme='red'>+18</Badge>}
                            </Box>
                            <IconButton
                                variant="ghost"
                                aria-label=''
                                icon={<CloseIcon />}
                                color={isDark ? "white" : "black"}
                                _hover={{
                                    backgroundColor: "unset"
                                }}
                                onClick={onCollapse}
                            />
                        </Box>
                        <Box display="flex" flexDir="row"
                            alignItems="center" justifyContent="flex-start" columnGap={2} py={2}>
                            <StarIcon color="goldenrod" />
                            <Heading as={"h3"} size="md"  color={isDark ? "white" : "black"}>{item.vote_average}</Heading>
                            <Heading as={"span"} size="md" fontWeight="normal" letterSpacing="0.01rem" fontSize="1rem" color={isDark ? "white" : "black"}>
                                / 10
                            </Heading>
                            {/* @ts-ignore - Just a temporal thing */}
                            {item?.release_date &&
                                <>
                                    <Heading color={isDark ? "white" : "black"} as={"h3"} size="sm" fontWeight="normal">- Release date:</Heading>
                                    <Heading color={isDark ? "white" : "black"} as={"span"} size="sm">
                                        {/* @ts-ignore - Just a temporal thing */}
                                        {item.release_date}
                                    </Heading>
                                </>
                            }
                            {/* @ts-ignore - Just a temporal thing */}
                            {item?.first_air_date &&
                                <>
                                    <Heading color={isDark ? "white" : "black"} as={"h3"} size="sm" fontWeight="normal">- First Air date:</Heading>
                                    <Heading color={isDark ? "white" : "black"} as={"span"} size="sm">
                                        {/* @ts-ignore - Just a temporal thing */}
                                        {item.first_air_date}
                                    </Heading>
                                </>
                            }
                        </Box>
                        <Box display="flex" flexDir="row"
                            alignItems="flex-start" justifyContent="flex-start" py={2} pr={8}>
                            <Text color={isDark ? "white" : "black"}>
                                {itemOverview}
                            </Text>
                        </Box>
                        <Box display="flex" flexDir="column"
                            alignItems="flex-start" justifyContent="flex-start" mt={4} py={2} pr={8}>
                            <Heading color={isDark ? "white" : "black"} as="h3" size="sm" pb={3}>Similar Content</Heading>
                            <Flex flexDir="row" flexWrap="wrap" justifyContent="flex-start" columnGap={4}>
                                {
                                    (isFetchingSimilarContent || isLoadingSimilarContent) && (
                                        <>
                                            <SimilarCardLoader />
                                            <SimilarCardLoader />
                                        </>
                                    )
                                }
                                {
                                    (dataSimilarContent || []).slice(0, 2).map((similarItem) => {
                                        return <SimilarCard key={`similar-${similarItem.id}`} isDark={isDark} item={similarItem} />
                                    })
                                }
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MotionBox>
    );
}