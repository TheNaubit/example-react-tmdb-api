import { MotionBox } from "@components/MotionBox";
import ContentLoader from "react-content-loader"

export function CompactCardLoader() {
    return (
        <MotionBox role="group" overflow="hidden" w={"280px"} h={"480px"} display="flex" flexDir="column"
            alignItems="center" justifyContent="center" rowGap={"10px"}>
            <MotionBox
                py={0.5} borderRadius={20} display="flex" flexDir="column"
                alignItems="center" justifyContent="center" cursor="pointer"
                minW={"250px"}
                w={"250px"} h={"375px"}
                px={0.5}
                opacity={0.6}
                _groupHover={{
                    boxShadow: "0px 0px 15px 6px rgb(247 187 122 / 80%)",
                    opacity: "1"
                }}
                transition= {"box-shadow 1s ease-in-out, opacity .4s ease-in-out"}
            >
                <ContentLoader
                    speed={2}
                    width={250}
                    height={375}
                    viewBox="0 0 250 375"
                    backgroundColor="#d8d8d8"
                    foregroundColor="#c0c0c0"
                >
                    <rect x="0" y="0" rx="20" ry="20" width="250" height="375" />
                </ContentLoader>
            </MotionBox>
        </MotionBox>
    )
}