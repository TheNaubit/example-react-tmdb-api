import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { ITabItem } from "@types";
import { useState } from "react";

interface ITabComponent {
    tabs: Array<ITabItem>,
    defaultIndex?: number,
    onChangeSelected?: (newSelection: number) => void
}

export const TabComponent = ({ tabs, onChangeSelected, defaultIndex = 0 }: ITabComponent) => {
    const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

    function _onTabClick(index: number) {
        setActiveTabIndex(index);
        document.documentElement.style.setProperty('--content-bg-color', tabs[index].color);
        if (typeof onChangeSelected === "function") onChangeSelected(index)
    };

    return (
        <UnorderedList className="tab-links" role="tablist" padding={0} mx="auto" mt={6} mb={-2} listStyleType="none" maxW="400px" display="flex" justifyContent="space-between" alignItems="center" opacity={0.4} _hover={{
            opacity: 1
        }} transition={"opacity .4s ease-in-out"}>
            {tabs.map((tab, index) => (
                <ListItem
                    key={tab.id}
                    pos="relative"
                    className={`tab ${activeTabIndex === index ? "active" : ""}`}
                    bgColor={tabs[tabs.length - 1 - index].color}
                    transition={"background-color 0.1s ease-in-out"}
                    borderRadius="40px"
                >
                    <Text className="prevent-select" cursor="pointer" as="p" px="36px" py="10px" display="flex" alignItems="center" fontSize="20px" overflow="hidden" pos="relative" textDecor="none" color="white" onClick={() => _onTabClick(index)}>
                        {tab.icon}
                        <Text pl="10px" as="span" textDecor="none">{tab.title}</Text>
                    </Text>
                </ListItem>
            ))}
        </UnorderedList>
    )
}