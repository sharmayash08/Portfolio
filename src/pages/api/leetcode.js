export default async function handler(req, res) {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    try {
      // Fetch LeetCode stats
      const statsResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const statsData = await statsResponse.json();
  
      // Fetch contest data
      const contestResponse = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query userContestRankingInfo($username: String!) {
              userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
              }
              userContestRankingHistory(username: $username) {
                attended
                rating
                ranking
                contest {
                  title
                  startTime
                }
              }
            }
          `,
          variables: { username }
        })
      });
  
      const contestData = await contestResponse.json();
  
      // Combine the data
      const combinedData = {
        stats: statsData,
        contest: contestData.data,
        badges: [
          { id: 1, name: "200 Days Badge 2024", icon: "https://leetcode.com/static/images/badges/2024/lg/2024-annual-100.png" },
          { id: 2, name: "75 Days Badge", icon: "https://leetcode.com/static/images/badges/2024/lg/dcc-2024-2.png" },
          { id: 3, name: "50 Days Badge", icon: "https://leetcode.com/static/images/badges/2024/lg/dcc-2024-1.png" }
        ]
      };
  
      res.status(200).json(combinedData);
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      res.status(500).json({ error: 'Failed to fetch LeetCode data' });
    }
  }