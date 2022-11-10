import { getTopMovies, getTopTVPrograms } from "@api";
import { Box, Button, Heading, useToast, Flex, IconButton } from "@chakra-ui/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ContentType, IMovie, ITabItem, ITVProgram, LoaderState, Direction } from "@types";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion"
import { DetailsCard } from "@components/DetailsCard";
import { CompactCard } from "@components/CompactCard";

import { TriangleUpIcon, ViewIcon } from "@chakra-ui/icons";
import { TabComponent } from "@components/TabComponent";
import { CompactCardLoader } from "@components/CompactCardLoader";
import { useLoader } from "@hooks/useLoader";
import { ListMoveButton } from "@components/ListMoveButton";
import { Footer } from "@components/Footer";
import "@styles/animated-bg-particles.css";
import { ParticleItem } from "@components/ParticleItem";

const tabs: Array<ITabItem> = [
    {
        title: "Movies",
        id: "movies",
        icon: <TriangleUpIcon />,
        color: "#4158D0",
    },
    {
        title: "Series",
        id: "series",
        icon: <ViewIcon />,
        color: "#C850C0",
    }
];

export function HomePage() {

    const toast = useToast()

    const { changeLoaderState } = useLoader()

    const { fetchNextPage: fetchNextPageTopFilms, hasNextPage: hasNextPageTopFilms, isFetching: isFetchingTopFilms, isLoading: isLoadingTopFilms, data: dataTopFilms, error: errorTopFilms } =
        useInfiniteQuery({
            queryKey: ["top-films"], queryFn: getTopMovies,
            getNextPageParam: (lastPage) => lastPage.page + 1
        })


    const { fetchNextPage: fetchNextPageTopTVPrograms, hasNextPage: hasNextPageTopTVPrograms, isFetching: isFetchingTopTVPrograms, isLoading: isLoadingTopTVPrograms, data: dataTopTVPrograms, error: errorTopTVPrograms } =
        useInfiniteQuery({
            queryKey: ["top-tv-programs"], queryFn: getTopTVPrograms,
            getNextPageParam: (lastPage) => lastPage.page + 1
        })

    const [selectedItem, setSelectedItem] = useState<IMovie | ITVProgram | null>(null)
    const [firstRenderedItemIndex, setFirstRenderedItemIndex] = useState(0)

    const [currentSelectedContent, setCurrentSelectedContent] = useState<ContentType>(ContentType.Movie)

    function _onChangeSelectedContentType(newSelection: number) {
        switch (newSelection) {
            case 1:
                setCurrentSelectedContent(ContentType.TV)
                break;
            case 0:
            default:
                setCurrentSelectedContent(ContentType.Movie)
                break;
        }
        setFirstRenderedItemIndex(0)
    }

    const currentContentList = useMemo(() => {
        const _data = currentSelectedContent === ContentType.Movie ? dataTopFilms : dataTopTVPrograms

        const _items: Array<IMovie | ITVProgram> = [];

        (_data?.pages || []).map((group, i) => {
            group.results.map((item: IMovie | ITVProgram) => _items.push(item))
        })

        return _items;

    }, [currentSelectedContent, dataTopFilms, dataTopTVPrograms])
    const isLoadingCurrentContentList = useMemo(() => currentSelectedContent === ContentType.Movie ? isLoadingTopFilms || isFetchingTopFilms : isLoadingTopTVPrograms || isFetchingTopTVPrograms, [isLoadingTopFilms, isLoadingTopTVPrograms, isFetchingTopFilms, isFetchingTopTVPrograms])
    const headerText = useMemo(() => `Which are the top ${currentSelectedContent === ContentType.Movie ? "movies" : "TV series"}?`, [currentSelectedContent])
    const particleItems = useMemo(() => <Box pos="fixed" w="100vw" h="100vh" zIndex={0}>{new Array(15).fill(0).map((_, i) => <ParticleItem key={`particle-${i}`} />)}</Box>, [])

    function _onMoveList(direction: Direction) {
        if (direction === Direction.Forward && firstRenderedItemIndex + 2 + 1 > (currentContentList || []).length - 1) return;
        if (direction === Direction.Backward && firstRenderedItemIndex - 1 < 0) return;

        setFirstRenderedItemIndex(direction === Direction.Forward ? firstRenderedItemIndex + 1 : firstRenderedItemIndex - 1)

        if (firstRenderedItemIndex + 2 + 5 > (currentContentList || []).length - 1) {
            if (currentSelectedContent === ContentType.Movie) fetchNextPageTopFilms()
            else fetchNextPageTopTVPrograms()
        }
    }

    useEffect(() => {
        if (errorTopFilms) {
            toast({
                title: "😥 Something happened...",
                description: "We had issues loading the list of top rated movies, please try again later!",
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "top-right"
            })
        }

        if (errorTopTVPrograms) {
            toast({
                title: "😥 Something happened...",
                description: "We had issues loading the list of top rated TV programs, please try again later!",
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "top-right"
            })
        }

    }, [errorTopFilms, errorTopTVPrograms])

    useEffect(() => {
        changeLoaderState(LoaderState.Loaded)
    }, [])

    return (
        <Box className="particles-container" w="100vw" h="100vh" px={4} py={4} overflow="hidden" transition="background-color 1s ease-in-out" bgColor={"var(--content-bg-color)"}>
            {particleItems}
            <Box pos="fixed" zIndex={1} w="100vw" h="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center" rowGap={8}>
                <Heading as="h1" size="2xl" color="white">{headerText}</Heading>
                <TabComponent tabs={tabs} onChangeSelected={_onChangeSelectedContentType} />
                <Flex columnGap={0} rowGap={0} justifyContent="center" flexWrap="wrap" flexDir="column" flexShrink={0} overflow="hidden" alignItems="center" maxW="1200px" w="100%" h="480px">
                    <ListMoveButton currentFirstItemIndex={firstRenderedItemIndex} listMaxItem={(currentContentList || []).length - 1} mt={-8} direction={Direction.Backward} onClick={_onMoveList} />
                    <Flex columnGap={4} justifyContent="center" flexWrap="wrap" flexDir="row" flexShrink={0} overflow="hidden" alignItems="center" maxW="900px" h="480px">
                        {
                            isLoadingCurrentContentList && (
                                <>
                                    <CompactCardLoader />
                                    <CompactCardLoader />
                                    <CompactCardLoader />
                                    <CompactCardLoader />
                                </>
                            )
                        }
                        {!isLoadingCurrentContentList && currentContentList && currentContentList.slice(firstRenderedItemIndex, 3 + firstRenderedItemIndex).map((content, index) => (
                            <CompactCard key={content.id} listIndex={firstRenderedItemIndex + index} onExpand={() => setSelectedItem(content)} disabled={selectedItem !== null && selectedItem.id !== content.id} item={content} />
                        ))}
                    </Flex>
                    <ListMoveButton currentFirstItemIndex={firstRenderedItemIndex} listMaxItem={(currentContentList || []).length - 1} mt={-8} direction={Direction.Forward} onClick={_onMoveList} />
                </Flex>
                <Footer />
                <AnimatePresence>
                    {selectedItem && (
                        <DetailsCard contentType={currentSelectedContent} item={selectedItem} onCollapse={() => { setSelectedItem(null) }} />
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    )
}