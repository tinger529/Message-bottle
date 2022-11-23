import { useState } from "react";

// const client = new WebSocket('ws://localhost:4000');

const useChat = () => {
    const logOut = () => {
        setPanes([]);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [anotherUser, setAnotherUser] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const initialPanes = [
    //     { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    //     { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    //     { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
    ];
    const [newTabIndex, setNewTabIndex] = useState(3);
    const [activeKey, setActiveKey] = useState();
    const [panes, setPanes] = useState(initialPanes);
    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };
    
    const onEdit = (targetKey, action) => {
        if(action === 'add'){
            showModal();
        }
        if(action === 'remove') {
            remove(targetKey)
        }
    };
    
    const add = (chatBoxName) => {
        setNewTabIndex(newTabIndex+1);
        const activeKey = `newTab${newTabIndex}`;
        const newPanes = [...panes];
        newPanes.push({ title: anotherUser, chatBoxName: chatBoxName, key: activeKey });
        setPanes(newPanes);
        setActiveKey(activeKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if(lastIndex >= 0){
                newActiveKey = newPanes[lastIndex].key;
            }else{
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        setActiveKey(activeKey);
    };
    
    return {
        logOut,
        isModalVisible,
        anotherUser,
        setAnotherUser,
        handleOk,
        handleCancel,
        activeKey,
        panes,
        onChange,
        onEdit,
        add,
    };

};



export default useChat;
