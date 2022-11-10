import { MotionBox } from "@components/MotionBox";
import ContentLoader from "react-content-loader"

export function SimilarCardLoader() {
    return (
        <MotionBox role="group" w={"125px"} h={"280px"} display="flex" flexDir="column"
            alignItems="center" justifyContent="flex-start" rowGap={"10px"} cursor="pointer">
            <MotionBox
                py={0.5} borderRadius={20} display="flex" flexDir="column"
                alignItems="center" justifyContent="center" cursor="pointer"
                minW={"125px"}
                minH={"187.5px"}
                w={"125px"} h={"187.5px"}
                px={0.5}
            >
                <ContentLoader
                    speed={2}
                    width={125}
                    height={187.5}
                    viewBox="0 0 125 187.5"
                    backgroundColor="#d8d8d8"
                    foregroundColor="#c0c0c0"
                >
                    <rect x="0" y="0" rx="20" ry="20" width="125" height="187.5" />
                </ContentLoader>
            </MotionBox>
        </MotionBox>
    )
}