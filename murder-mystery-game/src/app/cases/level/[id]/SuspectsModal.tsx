"use client";

import SuspectsContent from "./suspectsContent";
import SuspectArrestContent from "./SuspectArrestContent";

interface SuspectsModalProps {
    suspects: any[];
    onClose: () => void;
    currentContent: string;
    suspectChatHistories?: any;
    setSuspectChatHistories?: any;
}

const SuspectsModal: React.FC<SuspectsModalProps> = ({
    onClose,
    suspects,
    suspectChatHistories,
    setSuspectChatHistories,
    currentContent,
}) => {
    const renderModal = () => {
        switch (currentContent) {
            case "chatting":
                return (
                    <SuspectsContent
                        suspects={suspects}
                        suspectChatHistories={suspectChatHistories}
                        setSuspectChatHistories={setSuspectChatHistories}
                    />
                );
            case "arrest":
                return <SuspectArrestContent suspects={suspects} />;
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl w-full max-h-full overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {renderModal()}
            </div>
        </div>
    );
};

export default SuspectsModal;
