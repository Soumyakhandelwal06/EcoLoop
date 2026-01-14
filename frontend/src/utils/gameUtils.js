export const getUserRank = (user) => {
    if (!user || !user.progress || user.progress.length === 0) {
        return "Eco Scout";
    }

    // Sort progress by level_id descending to get the "latest" completed level
    const completedLevels = user.progress
        .filter(p => p.status === 'completed')
        .sort((a, b) => b.level_id - a.level_id);

    if (completedLevels.length === 0) {
        return "Eco Scout";
    }

    const latestLevelId = completedLevels[0].level_id;

    switch (latestLevelId) {
        case 1: return "Eco Beginner";
        case 2: return "Climate Champion";
        case 3: return "Resource Guardian";
        case 4: return "Green Practitioner";
        case 5: return "Climate Aware Advocate";
        default: return "Eco Beginner";
    }
};
