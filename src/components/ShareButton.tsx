import React from 'react';

const ShareButton: React.FC<{ url: string }> = ({ url }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ url });
        } else {
            alert(`Sharing ${url}`);
        }
    };

    return (
        <div className="cursor-pointer p-3 px-6 rounded-full h-full bg-darkGray"
            onClick={handleShare}
        >
            <span role="img" aria-label="share" className="text-xlg">
                📎
            </span>
        </div >
    );
};

export default ShareButton;
