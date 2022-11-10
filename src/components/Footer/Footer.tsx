import { Flex, Link, Text } from "@chakra-ui/react";
import { MY_TWITTER_URL, TMDB_API_DOCS_URL } from "@constants";

export function Footer() {
    return (
        <Flex pos="fixed" bottom={4}>
            <Text color="white">
                <Text as="span" opacity={0.3} _hover={{
                    opacity: 0.5
                }} transition={"opacity .4s ease-in-out"} className="prevent-select">Created with 💚 by </Text>
                <Link opacity={0.6} _hover={{
                    opacity: 1
                }} transition={"opacity .4s ease-in-out"} href={MY_TWITTER_URL} target="_blank">Al | @thenaubit</Link>
                <Text as="span" opacity={0.3} _hover={{
                    opacity: 0.5
                }} transition={"opacity .4s ease-in-out"} className="prevent-select"> using the </Text>
                <Link opacity={0.6} _hover={{
                    opacity: 1
                }} transition={"opacity .4s ease-in-out"} href={TMDB_API_DOCS_URL} target="_blank">TMDB API</Link></Text>
        </Flex>
    )
}