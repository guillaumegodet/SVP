import React from 'react';
import { authorsDatabase, journalsDatabase } from '../../constants';

interface PublicationRenderersProps {
    handleAuthorClick: (authorName: string, event: React.MouseEvent<HTMLElement>) => void;
    handleJournalClick: (journalName: string, event: React.MouseEvent<HTMLElement>) => void;
}

export const usePublicationRenderers = ({ handleAuthorClick, handleJournalClick }: PublicationRenderersProps) => {
    const renderAuthors = (authorsString: string) => {
        const authorNames = authorsString.split(',').map(name => name.trim());

        return (
            <span>
                {authorNames.map((authorName, index) => {
                    const author = authorsDatabase[authorName];
                    const isInternal = author?.isInternal;
                    return (
                        <span key={index}>
                            {author ? (
                                <span
                                    onClick={(e) => handleAuthorClick(authorName, e)}
                                    className="text-[#006a61] hover:underline cursor-pointer"
                                    style={{
                                        backgroundColor: isInternal ? '#E8F5F3' : 'transparent',
                                        padding: isInternal ? '2px 6px' : '0',
                                        borderRadius: isInternal ? '4px' : '0',
                                        fontWeight: isInternal ? 500 : 'normal'
                                    }}
                                    title="Voir le profil"
                                >
                                    {authorName}
                                </span>
                            ) : (
                                <span>{authorName}</span>
                            )}
                            {index < authorNames.length - 1 && ', '}
                        </span>
                    );
                })}
            </span>
        );
    };

    const renderJournal = (journalName: string | undefined) => {
        if (!journalName) return <span>—</span>;

        const isKnownJournal = journalsDatabase[journalName];

        return isKnownJournal ? (
            <span
                onClick={(e) => handleJournalClick(journalName, e)}
                className="text-[#006a61] hover:underline cursor-pointer"
                title="Voir les informations"
            >
                {journalName}
            </span>
        ) : (
            <span>{journalName}</span>
        );
    };

    return { renderAuthors, renderJournal };
};
