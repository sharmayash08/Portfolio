import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedInIcon } from './Icons';
import Image from 'next/image';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import CircularProgress from './CircularProgress';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const USERNAME = 'yash280876'; // Replace with your username

const formatRating = (rating) => Math.round(rating).toLocaleString();
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.getFullYear();
};

const ProfileSection = () => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [codeforcesStats, setCodeforcesStats] = useState(null);
  const [leetcodeBadges, setLeetcodeBadges] = useState([]);
  const [leetcodeContestHistory, setLeetcodeContestHistory] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/leetcode?username=${USERNAME}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch LeetCode data');
        }

        if (data.stats) {
          setLeetcodeStats({
            solved: {
              easy: data.stats.easySolved || 0,
              medium: data.stats.mediumSolved || 0,
              hard: data.stats.hardSolved || 0,
            },
            total: {
              easy: data.stats.totalEasy || 873,
              medium: data.stats.totalMedium || 1829,
              hard: data.stats.totalHard || 824,
            },
            attempting: 24,
          });
        }

        if (data.contest) {
          const { userContestRanking, userContestRankingHistory } = data.contest;
          setLeetcodeContestHistory({
            rating: userContestRanking?.rating,
            attended: userContestRanking?.attendedContestsCount || 0,
            ranking: userContestRanking?.globalRanking || 0,
            totalParticipants: userContestRanking?.totalParticipants || 0,
            topPercentage: userContestRanking?.topPercentage || 0,
            history: userContestRankingHistory || []
          });
        }

        setLeetcodeBadges(data.badges || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();

    // Fetch Codeforces stats
    fetch('https://codeforces.com/api/user.info?handles=yash280876')
      .then(res => res.json())
      .then(data => setCodeforcesStats(data))
      .catch(err => console.error('Error fetching Codeforces stats:', err));

    // Generate contribution data
    const mockContributions = Array(365).fill(0).map(() => Math.floor(Math.random() * 5));
    setContributions(mockContributions);
  }, []);

  const generateMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => (
      <div key={month} className="text-xs text-gray-500 dark:text-gray-400">
        {month}
      </div>
    ));
  };

  const socialLinks = [
    { icon: "github", url: "https://github.com", label: "GitHub" },
    { icon: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
    { icon: "leetcode", url: "https://leetcode.com", label: "LeetCode" },
    { icon: "twitter", url: "https://twitter.com", label: "Twitter" },
    { icon: "instagram", url: "https://instagram.com", label: "Instagram" }
  ];

  const skills = [
    { name: "HTML5", icon: "html5" },
    { name: "CSS", icon: "css3" },
    { name: "Java", icon: "java" },
    { name: "Go", icon: "go" },
    { name: "Javascript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Python", icon: "python" },
    { name: "React", icon: "react" },
    { name: "Tailwindcss", icon: "tailwind" },
    { name: "Daisy UI", icon: "daisy" },
    { name: "Axios", icon: "axios" },
    { name: "React-router", icon: "react-router" },
    { name: "Zustand", icon: "zustand" },
    { name: "Redux-toolkit", icon: "redux" },
    { name: "Styled-components", icon: "styled-components" },
    { name: "Tanstack-query", icon: "tanstack" },
    { name: "React-hook-form", icon: "react-hook-form" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Express JS", icon: "express" },
    { name: "Socket.io", icon: "socket" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Mongoose", icon: "mongoose" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Github", icon: "github" },
    { name: "Git", icon: "git" },
    { name: "Supabase", icon: "supabase" },
    { name: "Postman API", icon: "postman" },
    { name: "Leaflet", icon: "leaflet" },
    { name: "Docker", icon: "docker" }
  ];

  // Calculate percentages for progress bars
  const getProgressBarWidth = (solved, total) => {
    return solved && total ? `${(solved / total) * 100}%` : '0%';
  };

  const contestChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: true,
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value, index, values) {
            if (index === 0) return '2024';
            if (index === values.length - 1) return '2025';
            return '';
          },
        },
        border: {
          display: false,
        }
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#1F2937',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const rating = tooltipItems[0].raw;
            return `Rating: ${formatRating(rating)}`;
          },
          label: () => '',
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderColor: '#F59E0B',
        borderWidth: 2,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 2,
        backgroundColor: '#F59E0B',
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // Add loading state UI
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-800 rounded-xl mb-8"></div>
          <div className="h-64 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Add error state UI
  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-6 text-red-500">
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Section */}
        <div className="mb-12">
          <p className="text-xl leading-relaxed mb-8 text-gray-800 dark:text-gray-200">
            I&apos;m a passionate software engineer who loves crafting robust, scalable,
            and efficient applications to solve real-world problems. With a strong
            foundation in software development and a curiosity for technology, I
            specialize in designing systems that scale seamlessly while delivering
            exceptional user experiences
          </p>
          <ul className="space-y-2 text-gray-800 dark:text-gray-200">
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-500">➜</span>
              Pre-final Computer Science student
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-500">➜</span>
              Full-stack Developer
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-500">➜</span>
              Strong foundation in problem solving
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-500">➜</span>
              400+ DSA problems solved
            </li>
          </ul>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Skills And Tools</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`text-xl devicon-${skill.icon}-plain colored`}></i>
                {skill.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coding Profiles Grid */}
        <div className="flex justify-between items-start gap-8 mt-8">
          {/* LeetCode Stats */}
          <div className="w-[48%] bg-white dark:bg-[#1A1A1A] p-6 rounded-xl shadow-lg transition-colors">
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FFA116]">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.825.744 1.421 0 2.587-1.155 2.587-2.576 0-.708-.287-1.357-.77-1.823l-2.694-2.695c-.915-.914-2.064-1.378-3.387-1.378-1.334 0-2.461.424-3.387 1.378l-4.377 4.357c-.914.914-1.377 2.176-1.377 3.554 0 1.357.424 2.461 1.377 3.387l4.334 4.357c.914.914 2.064 1.357 3.387 1.357s2.473-.424 3.387-1.357l2.697-2.695c.5-.514.77-1.164.77-1.823 0-1.421-1.166-2.576-2.588-2.576-.714 0-1.315.196-1.824.744z" fill="currentColor"/>
              </svg>
              <span className="text-[#42A1FF] text-xl font-medium">
                <Link href="https://leetcode.com/yash280876/">{USERNAME}</Link>
              </span>
              <span className="ml-auto text-gray-600 dark:text-gray-400 text-sm">
                #{leetcodeStats?.ranking || '167,220'}
              </span>
            </div>

            <div className="flex items-start gap-8">
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={leetcodeStats ? (
                    leetcodeStats.solved.easy +
                    leetcodeStats.solved.medium +
                    leetcodeStats.solved.hard
                  ) : 684}
                  easy={{
                    solved: leetcodeStats?.solved.easy || 316,
                    total: leetcodeStats?.total.easy || 873
                  }}
                  medium={{
                    solved: leetcodeStats?.solved.medium || 339,
                    total: leetcodeStats?.total.medium || 1829
                  }}
                  hard={{
                    solved: leetcodeStats?.solved.hard || 29,
                    total: leetcodeStats?.total.hard || 824
                  }}
                  className="mb-2"
                />
                {leetcodeContestHistory?.rating && (
                  <span className="text-sm text-gray-400">
                    Rating: {Math.round(leetcodeContestHistory.rating)}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#43CD89]">Easy</span>
                    <span className="text-gray-400">
                      {leetcodeStats?.solved.easy || 316} / {leetcodeStats?.total.easy || 873}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#43CD89] rounded-full transition-all duration-300" 
                      style={{
                        width: `${((leetcodeStats?.solved.easy || 316) / (leetcodeStats?.total.easy || 873)) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FFB800]">Medium</span>
                    <span className="text-gray-400">
                      {leetcodeStats?.solved.medium || 339} / {leetcodeStats?.total.medium || 1829}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FFB800] rounded-full transition-all duration-300" 
                      style={{
                        width: `${((leetcodeStats?.solved.medium || 339) / (leetcodeStats?.total.medium || 1829)) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FF375F]">Hard</span>
                    <span className="text-gray-400">
                      {leetcodeStats?.solved.hard || 29} / {leetcodeStats?.total.hard || 824}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF375F] rounded-full transition-all duration-300" 
                      style={{
                        width: `${((leetcodeStats?.solved.hard || 29) / (leetcodeStats?.total.hard || 824)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Codeforces Stats */}
          <div className="w-[48%] bg-white dark:bg-[#1A1A1A] p-6 rounded-xl shadow-lg transition-colors">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-[#1890FF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9 0c.828 0 1.5.672 1.5 1.5v6c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-6c0-.828.672-1.5 1.5-1.5h3zm9 0c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5h3z"/>
              </svg>
              <span className="text-[#1890FF] text-xl font-medium">
                <Link href="https://codeforces.com/profile/yash280876">{USERNAME}</Link>
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  codeforcesStats?.result?.[0]?.rating > 1900 ? 'bg-purple-500/20 text-purple-400' :
                  codeforcesStats?.result?.[0]?.rating > 1600 ? 'bg-blue-500/20 text-blue-400' :
                  codeforcesStats?.result?.[0]?.rating > 1400 ? 'bg-cyan-500/20 text-cyan-400' :
                  codeforcesStats?.result?.[0]?.rating > 1200 ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {codeforcesStats?.result?.[0]?.rank || 'Newbie'}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  #{codeforcesStats?.result?.[0]?.rating || '...'}
                </span>
              </div>
            </div>
            
            {codeforcesStats?.result?.[0] ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Current Rating</span>
                  <span className={`text-xl font-bold ${
                    codeforcesStats.result[0].rating > 1900 ? 'text-purple-400' :
                    codeforcesStats.result[0].rating > 1600 ? 'text-blue-400' :
                    codeforcesStats.result[0].rating > 1400 ? 'text-cyan-400' :
                    codeforcesStats.result[0].rating > 1200 ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {codeforcesStats.result[0].rating}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Max Rating</span>
                  <span className={`text-lg font-bold ${
                    codeforcesStats.result[0].maxRating > 1900 ? 'text-purple-400' :
                    codeforcesStats.result[0].maxRating > 1600 ? 'text-blue-400' :
                    codeforcesStats.result[0].maxRating > 1400 ? 'text-cyan-400' :
                    codeforcesStats.result[0].maxRating > 1200 ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {codeforcesStats.result[0].maxRating}
                  </span>
                </div>
                
                {/* Rating graph visualization */}
                <div className="mt-6">
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#1890FF]/20 to-transparent"></div>
                    <svg className="absolute bottom-0 left-0 right-0 h-2/3" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path 
                        d="M0,50 L5,45 L10,48 L15,40 L20,42 L25,38 L30,35 L35,40 L40,35 L45,30 L50,32 L55,25 L60,28 L65,20 L70,22 L75,15 L80,18 L85,10 L90,12 L95,5 L100,0" 
                        fill="none" 
                        stroke="#1890FF" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>Past 6 months</span>
                    <span>Now</span>
                  </div>
                </div>
                
                {/* Contest participation */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Contests</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Codeforces Round #863</span>
                        <span className="text-[#1890FF]">+15</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Educational Round #152</span>
                        <span className="text-red-400">-8</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Codeforces Round #861</span>
                        <span className="text-[#1890FF]">+21</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mt-6"></div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mt-6"></div>
                <div className="space-y-2 mt-2">
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;