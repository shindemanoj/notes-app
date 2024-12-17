const notes =
    JSON.stringify([
        {
            id: 'uuid-1',
            title: 'First Note',
            content: 'Content of the first note.',
            createdTime: new Date().toISOString(),
        },
        {
            id: 'uuid-2',
            title: 'Second Note',
            content: 'Content of the second note.',
            createdTime: new Date().toISOString(),
        },
    ]);

export const getNotes = () => {
    return JSON.parse(notes);
};