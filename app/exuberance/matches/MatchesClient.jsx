'use client';

import { useMemo, useState } from 'react';
import ScrollableTrack from '../committee/ScrollableTrack.jsx';
import localStyles from './Matches.module.css';

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokensOf(value) {
  return normalizeName(value)
    .split(' ')
    .filter(Boolean);
}

function findBestNameMatch(query, options) {
  const qTokens = tokensOf(query);
  if (!qTokens.length) return null;

  const scored = options
    .map((opt) => {
      const optNorm = normalizeName(opt);
      const hits = qTokens.reduce((acc, t) => (optNorm.includes(t) ? acc + 1 : acc), 0);
      return { opt, hits, len: optNorm.length };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.len - b.len);

  return scored[0]?.opt ?? null;
}

const BADMINTON_GIRLS_FIXTURES = [
  [1, 13],
  [2, 9],
  [3, 10],
  [4, 11],
  [5, 12],
  [6, 14],
  [7, 15],
  [8, 16],
  [9, 2],
  [10, 3],
  [11, 4],
  [12, 5],
  [13, 1],
  [14, 6],
  [15, 7],
  [16, 8],
  [17, 18],
];

const BADMINTON_GIRLS_TEAMS = [
  { team: 1, players: ['Kashish Saw', 'Akrity Singh'] },
  { team: 2, players: ['Shalini Kumari', 'Sneha Pal'] },
  { team: 3, players: ['Anjali Gupta', 'Ahili Roy'] },
  { team: 4, players: ['Vidhi Mishra', 'Rupkatha Pal'] },
  { team: 5, players: ['Gungun Kumari', 'Anshika'] },
  { team: 6, players: ['Nibedita Roy', 'Atasi Pradhan'] },
  { team: 7, players: ['Jyotsna Singh', 'Anuska Paul'] },
  { team: 8, players: ['Sukanya Roy', 'Meghna Sinha'] },
  { team: 9, players: ['Samsunnehar Khatun', 'Shreya Kumari'] },
  { team: 10, players: ['Nandini Gupta', 'Soniya Kumari'] },
  { team: 11, players: ['Ritabrita Mallick', 'Sneha Mallick'] },
  { team: 12, players: ['Chahak Agrawal', 'Kashish Kumari'] },
  { team: 13, players: ['Sriza Biswas', 'Abhilasha Ghosh'] },
  { team: 14, players: ['Sneha Karmakar', 'Prakriti Das'] },
  { team: 15, players: ['Bistrina Sarkar', 'Bidisha Majumder'] },
  { team: 16, players: ['Dhriti Das', 'Faculty'] },
  { team: 17, players: ['Faculty', 'Faculty'] },
  { team: 18, players: ['Faculty', 'Faculty'] },
];

const TABLE_TENNIS_FIXTURES = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10],
  [11, 12],
  [13, 14],
  [15, 16],
  [17, 18],
  [19, 20],
  [21, 22],
  [23, 24],
  [25, 26],
];

const TABLE_TENNIS_PLAYERS = new Map([
  [1, 'Kritan Raj Patwa'],
  [2, 'Anurag'],
  [3, 'Umang Singh'],
  [4, 'Rounak Saha'],
  [5, 'Tanay Mukherjee'],
  [6, 'Rupam Haldar'],
  [7, 'Sunil Maity'],
  [8, 'Ankit Kumar'],
  [9, 'Tuhin Mahata'],
  [10, 'Aviraj Paul'],
  [11, 'Ayushman Das'],
  [12, 'Akash Das'],
  [13, 'Abhinandan Guchhait'],
  [14, 'Mayank Bhaskar'],
  [15, 'Debojyoti Das'],
  [16, 'Mahfuz Hossain'],
  [17, 'Surya Pratim Ganguly'],
  [18, 'Sohom Roy'],
  [19, 'Azhar Irfan'],
  [20, 'Anindya Mukhopadhyay'],
  [21, 'Atif Khan'],
  [22, 'Pratim Sahoo'],
  [23, 'Shree Shyam Jaiswal'],
  [24, 'Bikram Pal'],
  [25, 'Nishant Kumar'],
  [26, 'Rahul Kumar Ram'],
  [27, 'Faculty'],
  [28, 'Faculty'],
]);

const TABLE_TENNIS_GIRLS_FIXTURES = [
  [1, 2],
  [3, 4],
  [6, 7],
];

const TABLE_TENNIS_GIRLS_PLAYERS = new Map([
  [1, 'Sneha Pal'],
  [2, 'Samsunnehar Khatun'],
  [3, 'Asmita Chatterjee'],
  [4, 'Dhriti Das'],
  [6, 'Susweta Das'],
  [7, 'Bidisha Majumder'],
]);

const CRICKET_GIRLS_FIXTURES = [
  { label: 'M1', left: 'Team B', right: 'Team D' },
  { label: 'M2', left: 'Team A', right: 'Team C' },
];

const CRICKET_BOYS_R1 = [
  { label: 'M1', left: 'EE 3rd', right: 'DS 3rd' },
  { label: 'M2', left: 'BBA 2nd', right: 'IOT 1st' },
  { label: 'M3', left: 'CYS 2nd', right: 'IT 3rd' },
  { label: 'M4', left: 'CSE 3rd', right: 'ECE 3rd' },
  { label: 'M5', left: 'ECE 2nd', right: 'CSE 2nd' },
  { label: 'M6', left: 'DS 2nd', right: 'BCA (2nd + 3rd)' },
  { label: 'M7', left: 'ECE 1st', right: 'IOT 3rd' },
  { label: 'M8', left: 'IT 2nd', right: 'CSE FAC 1' },
  { label: 'M9', left: 'FAC 2', right: 'MCA 1st' },
  { label: 'M10', left: 'DS 1st', right: 'CSBS 3rd' },
  { label: 'M11', left: 'FAC 1', right: 'AIML 1st' },
  { label: 'M12', left: 'CE + ME + EE + AEIE 4th', right: 'CSE 1st' },
  { label: 'M13', left: 'CYS 1st', right: 'AIML 4th' },
  { label: 'M14', left: 'CSE 4th', right: 'IT 1st' },
  { label: 'M15', left: 'BCA 1st', right: 'CSDS 4th' },
  { label: 'M16', left: 'CSE FAC 2', right: 'ECE 4th' },
];

const CRICKET_BOYS_R2 = [
  { label: 'A', left: '1', right: '7' },
  { label: 'G', left: '4', right: '10' },
  { label: 'C', left: '8', right: '9' },
  { label: 'D', left: '3', right: '13' },
  { label: 'E', left: '11', right: '14' },
  { label: 'F', left: '2', right: '6' },
  { label: 'B', left: '12', right: '15' },
  { label: 'H', left: '5', right: '16' },
];

const CRICKET_BOYS_R3 = [
  { label: 'i', left: 'F', right: 'H' },
  { label: 'ii', left: 'D', right: 'E' },
  { label: 'iii', left: 'A', right: 'G' },
  { label: 'iv', left: 'B', right: 'C' },
];

const CRICKET_BOYS_SF = [
  { label: 'SF1', left: 'i', right: 'iv' },
  { label: 'SF2', left: 'ii', right: 'iii' },
];

const CARROM_BOYS_TEAMS = new Map([
  [1, ['Ajit Yadav', 'Md Asif']],
  [2, ['Shubham Mondal', 'Sunny Kumar']],
  [3, ['Sunny Kumar Gupta', 'Vishal Kumar']],
  [4, ['Amit Mistry', 'Arpan Das']],
  [5, ['Chirantan Panty', 'MD Suhail']],
  [6, ['Shahid Raza', 'Shamir Akhtar']],
  [7, ['Shayan Ali', 'Soumyadeep Singha Roy']],
  [8, ['Souvik Dutta', 'Yogesh Karn']],
  [9, ['Arkajyoti Rakshit', 'Arnav Goswami']],
  [10, ['Harish Jamal', 'Koushik Gorai']],
  [11, ['Prince Kumar', 'Pritam Chatterjee']],
  [12, ['Ravi Raj', 'Saad Bin Riaz']],
  [13, ['Sabyasachee Samanta', 'Sahid Mondal']],
  [14, ['Abhishek Kumar', 'Sohail Khan']],
  [15, ['Soumyajit Ghosal', 'Swastik Dhar']],
  [16, ['Aman', 'Anurag']],
  [17, ['Arijit Kundu', 'Ayan Dutta']],
  [18, ['Pankaj Sharma', 'Satyam Kumar']],
  [19, ['Syed Shayan Khalid', 'Umang Singh']],
  [20, ['Akash Das', 'Aviraj Paul']],
  [21, ['Pritam Dey', 'Sk Mamun']],
  [22, ['Abhinandan Guchhait', 'Akshay Ghosh']],
  [23, ['Mahfuz Hossain', 'Sahil Dutta']],
  [24, ['Arjun Sagar Gupta', 'Ashutosh Saha']],
  [25, ['Devanshu Kumar', 'Imtiaz Hossain']],
  [26, ['Nikhil Kumar', 'Pranjal Verma']],
  [27, ['Rohit Singh', 'Satyam Kumar Jha']],
  [28, ['Shadab Saghir', 'Shahil Sharma']],
  [29, ['Shivam Kumar', 'Syed Kashaf']],
  [30, ['Md Rehan Ali', 'Amit Mahata']],
  [31, ['Ansh Kumar Singh', 'Prakhar Kanti Das']],
  [32, ['Sunil Maity', 'Debayan Dutta']],
  [33, ['Abhigyan Chakraborty', 'Adhrikto Dey']],
  [34, ['Ayush Dixit', 'Ayush Kumar Chowdhary']],
  [35, ['Ayush Kumar Singh', 'Jitendra Sethia']],
  [36, ['Subhadeep Bose', 'Ritam Mondal']],
  [37, ['Ankit Sikder', 'Bibasawan Bajpayee']],
  [38, ['Sohom Roy', 'Susty Suman']],
  [39, ['Poornayu Mukherjee', 'Soumyadeep Roy']],
  [40, ['Himagna Mallik', 'Pritam Basak']],
  [41, ['Aditya Prakash', 'Kounik Biswas']],
  [42, ['Sayantan Deb', 'Suraj Kumar Biswas']],
  [43, ['Rohan Samanta', 'Rahul Kumar Ram']],
  [44, ['Amit Kumar Das', 'Suman Chakraborty']],
  [45, ['Kunal Narnolia', 'Shree Shyam Jaiswal']],
  [46, ['Debraj Chatterjee', 'Sounak Sadhukhan']],
  [47, ['Faculty Member', 'Faculty Member']],
  [48, ['Faculty Member', 'Faculty Member']],
]);

const CARROM_GIRLS_TEAMS = new Map([
  [1, ['Akrity Singh', 'Anshi Prasad']],
  [2, ['Asmita Chatterjee', 'Sneha Mallick']],
  [3, ['Soniya Kumari', 'Runa Kumari']],
  [4, ['Sayani Pal', 'Sayanika Raha']],
  [5, ['Anamika Sasmal', 'Tannishtha Jana']],
  [6, ['Kashish Kumari', 'Meghna Sinha']],
  [7, ['Chahak Agrawal', 'Bistrina Sarkar']],
  [8, ['Pallabi Paloi', 'Dhriti Das']],
  [9, ['Faculty', 'Faculty']],
  [10, ['Faculty', 'Faculty']],
]);

function carromTeamLabel(teamNo, teamMap) {
  void teamMap;
  return `Team ${teamNo}`;
}

const CARROM_GIRLS_R1_PAIRS = [
  [6, 2],
  [9, 1],
  [4, 8],
  [10, 3],
  [7, 5],
];

const CARROM_BOYS_PAIRS = [
  [17, 4],
  [29, 1],
  [42, 8],
  [36, 12],
  [5, 27],
  [19, 44],
  [2, 33],
  [14, 6],
  [41, 25],
  [9, 30],
  [47, 11],
  [38, 22],
  [7, 45],
  [16, 3],
  [28, 40],
  [10, 35],
  [21, 48],
  [13, 31],
  [18, 24],
  [32, 15],
  [46, 26],
  [20, 39],
  [34, 23],
  [43, 37],
];

const CARROM_GIRLS_R1 = [
  { label: 'M1', left: carromTeamLabel(6, CARROM_GIRLS_TEAMS), right: carromTeamLabel(2, CARROM_GIRLS_TEAMS) },
  { label: 'M2', left: carromTeamLabel(9, CARROM_GIRLS_TEAMS), right: carromTeamLabel(1, CARROM_GIRLS_TEAMS) },
  { label: 'M3', left: carromTeamLabel(4, CARROM_GIRLS_TEAMS), right: carromTeamLabel(8, CARROM_GIRLS_TEAMS) },
  { label: 'M4', left: carromTeamLabel(10, CARROM_GIRLS_TEAMS), right: carromTeamLabel(3, CARROM_GIRLS_TEAMS) },
  { label: 'M5', left: carromTeamLabel(7, CARROM_GIRLS_TEAMS), right: carromTeamLabel(5, CARROM_GIRLS_TEAMS) },
];

const CARROM_BOYS_FIXTURES = [
  { label: 'M1', left: carromTeamLabel(17, CARROM_BOYS_TEAMS), right: carromTeamLabel(4, CARROM_BOYS_TEAMS) },
  { label: 'M2', left: carromTeamLabel(29, CARROM_BOYS_TEAMS), right: carromTeamLabel(1, CARROM_BOYS_TEAMS) },
  { label: 'M3', left: carromTeamLabel(42, CARROM_BOYS_TEAMS), right: carromTeamLabel(8, CARROM_BOYS_TEAMS) },
  { label: 'M4', left: carromTeamLabel(36, CARROM_BOYS_TEAMS), right: carromTeamLabel(12, CARROM_BOYS_TEAMS) },
  { label: 'M5', left: carromTeamLabel(5, CARROM_BOYS_TEAMS), right: carromTeamLabel(27, CARROM_BOYS_TEAMS) },
  { label: 'M6', left: carromTeamLabel(19, CARROM_BOYS_TEAMS), right: carromTeamLabel(44, CARROM_BOYS_TEAMS) },
  { label: 'M7', left: carromTeamLabel(2, CARROM_BOYS_TEAMS), right: carromTeamLabel(33, CARROM_BOYS_TEAMS) },
  { label: 'M8', left: carromTeamLabel(14, CARROM_BOYS_TEAMS), right: carromTeamLabel(6, CARROM_BOYS_TEAMS) },
  { label: 'M9', left: carromTeamLabel(41, CARROM_BOYS_TEAMS), right: carromTeamLabel(25, CARROM_BOYS_TEAMS) },
  { label: 'M10', left: carromTeamLabel(9, CARROM_BOYS_TEAMS), right: carromTeamLabel(30, CARROM_BOYS_TEAMS) },
  { label: 'M11', left: carromTeamLabel(47, CARROM_BOYS_TEAMS), right: carromTeamLabel(11, CARROM_BOYS_TEAMS) },
  { label: 'M12', left: carromTeamLabel(38, CARROM_BOYS_TEAMS), right: carromTeamLabel(22, CARROM_BOYS_TEAMS) },
  { label: 'M13', left: carromTeamLabel(7, CARROM_BOYS_TEAMS), right: carromTeamLabel(45, CARROM_BOYS_TEAMS) },
  { label: 'M14', left: carromTeamLabel(16, CARROM_BOYS_TEAMS), right: carromTeamLabel(3, CARROM_BOYS_TEAMS) },
  { label: 'M15', left: carromTeamLabel(28, CARROM_BOYS_TEAMS), right: carromTeamLabel(40, CARROM_BOYS_TEAMS) },
  { label: 'M16', left: carromTeamLabel(10, CARROM_BOYS_TEAMS), right: carromTeamLabel(35, CARROM_BOYS_TEAMS) },
  { label: 'M17', left: carromTeamLabel(21, CARROM_BOYS_TEAMS), right: carromTeamLabel(48, CARROM_BOYS_TEAMS) },
  { label: 'M18', left: carromTeamLabel(13, CARROM_BOYS_TEAMS), right: carromTeamLabel(31, CARROM_BOYS_TEAMS) },
  { label: 'M19', left: carromTeamLabel(18, CARROM_BOYS_TEAMS), right: carromTeamLabel(24, CARROM_BOYS_TEAMS) },
  { label: 'M20', left: carromTeamLabel(32, CARROM_BOYS_TEAMS), right: carromTeamLabel(15, CARROM_BOYS_TEAMS) },
  { label: 'M21', left: carromTeamLabel(46, CARROM_BOYS_TEAMS), right: carromTeamLabel(26, CARROM_BOYS_TEAMS) },
  { label: 'M22', left: carromTeamLabel(20, CARROM_BOYS_TEAMS), right: carromTeamLabel(39, CARROM_BOYS_TEAMS) },
  { label: 'M23', left: carromTeamLabel(34, CARROM_BOYS_TEAMS), right: carromTeamLabel(23, CARROM_BOYS_TEAMS) },
  { label: 'M24', left: carromTeamLabel(43, CARROM_BOYS_TEAMS), right: carromTeamLabel(37, CARROM_BOYS_TEAMS) },
];

const FOOTBALL_R1 = [
  { label: 'M1', left: 'CSE 4th', right: 'ECE 4th' },
  { label: 'M2', left: 'CSE 1st', right: 'IT 1st' },
  { label: 'M3', left: 'ECE 2nd', right: 'AIML 4th' },
  { label: 'M4', left: 'MCA 1st', right: 'AIML 2nd' },
  { label: 'M5', left: 'CSE 3rd', right: 'BCA 2nd' },
  { label: 'M6', left: 'CSE 2nd', right: 'ECE 1st' },
  { label: 'M7', left: 'AIML 3rd', right: 'BBA 3rd' },
  { label: 'M8', left: 'AEIE 4th', right: 'ECE 3rd' },
  { label: 'M9', left: 'IT 3rd', right: 'AIDS 1st' },
  { label: 'M10', left: 'CSBS 3rd', right: 'AIML 1st' },
];

const FOOTBALL_R2 = [
  { label: 'A', left: '1', right: '3' },
  { label: 'B', left: '2', right: '4' },
  { label: 'C', left: '5', right: '7' },
  { label: 'D', left: '6', right: '8' },
  { label: 'E', left: '9', right: '10' },
  { label: 'F', left: 'F1 (CSE)', right: 'BYE' },
];

const FOOTBALL_R3 = [
  { label: 'i', left: 'A', right: 'C' },
  { label: 'ii', left: 'B', right: 'D' },
  { label: 'iii', left: 'F', right: 'Qualifier' },
  { label: 'iv', left: 'F2 (AIML)', right: 'BYE' },
];

const FOOTBALL_SF = [
  { label: 'SF1', left: 'i', right: 'iv' },
  { label: 'SF2', left: 'ii', right: 'iii' },
];

const FOOTBALL_FINAL = [{ label: 'Final', left: 'Winner SF1', right: 'Winner SF2' }];

const CHESS_PLAYERS = new Map([
  [1, 'Soumyadipta Dey'],
  [2, 'Amit Mistry'],
  [3, 'Arpan Das'],
  [4, 'Ajit Yadav'],
  [5, 'Satyam Kumar'],
  [6, 'Sunny Kumar'],
  [7, 'Ravi Raj'],
  [8, 'Prince Kumar'],
  [9, 'Sujoy Das'],
  [10, 'Pankaj Sharma'],
  [11, 'Prince Kumar'],
  [12, 'Harsh Gaddhyan'],
  [13, 'Pritam Chatterjee'],
  [14, 'Pramit Kumar Mandal'],
  [15, 'Kunal Sinha'],
  [16, 'Soumyajit Ghosal'],
  [17, 'Saad Bin Riaz'],
  [18, 'Sandarbh Mehta'],
  [19, 'Sandarbh Mehta'],
  [20, 'Dibyajyoti Dey'],
  [21, 'Arpan Das'],
  [22, 'Shahid Raza'],
  [23, 'Rahul Haldar'],
  [24, 'Sayantan Saha'],
  [25, 'Shivam Kumar Tiwari'],
  [26, 'Tanay Mukherjee'],
  [27, 'Ayan Dutta'],
  [28, 'Snehadri Sekhar Bag'],
  [29, 'Vivek Kumar Das'],
  [30, 'Yogesh Karn'],
  [31, 'Shahid Raza'],
  [32, 'Atin Kumar Guria'],
  [33, 'Debdipta Sinha'],
  [34, 'Syed Shayan Khalid'],
  [35, 'Roshan Kumar'],
  [36, 'Md Musahid Rahaman Khan'],
  [37, 'Swapnil Gupta'],
  [38, 'Sunny Kumar Gupta'],
  [39, 'Sohail Khan'],
  [40, 'Yasir Hasan Rahimi'],
  [41, 'Rahul Haldar'],
  [42, 'Atin Kumar Guria'],
  [43, 'Md Asaduddin Ansari'],
  [44, 'Arpan Das'],
  [45, 'Arnav Goswami'],
  [46, 'Akrity Singh'],
  [47, 'Kashish Saw'],
  [48, 'Anshi Prasad'],
  [49, 'Bornita Dey'],
  [50, 'Sujoy Das'],
  [51, 'Nayan Bairaggya'],
  [52, 'Yuvraj Pandey'],
  [53, 'Aditya Kumar'],
  [54, 'Devanshu Kumar'],
  [55, 'Mohammad Farzan Alam'],
  [56, 'Rahul Kumar'],
  [57, 'Tuhin Mahata'],
  [58, 'Abhishek Dutta'],
  [59, 'Satyam Kumar Jha'],
  [60, 'Aditya Pal'],
  [61, 'Rohit Singh'],
  [62, 'Mayank Bhaskar'],
  [63, 'Nikhil Kumar'],
  [64, 'Rishi Thakur'],
  [65, 'Md Rehan Ali'],
  [66, 'Debojyoti Das'],
  [67, 'Roopam Basak'],
  [68, 'Akshay Ghosh'],
  [69, 'Soumya Halder'],
  [70, 'Rahul Kumar'],
  [71, 'Pranjal Verma'],
  [72, 'Syed Kashaf'],
  [73, 'Arunima Das'],
  [74, 'Dhriti Das'],
  [75, 'Anushreeta Ghosh'],
  [76, 'Surya Pratim Ganguly'],
  [77, 'Ayush Dixit'],
  [78, 'Azhar Irfan'],
  [79, 'Anindya Mukhopadhyay'],
  [80, 'Atif Khan'],
  [81, 'Subhadeep Bose'],
  [82, 'Yuvraj Kumar Sah'],
  [83, 'Jitendra Sethia'],
  [84, 'Susweta Das'],
  [85, 'Rohan Samanta'],
  [86, 'Kounik Biswas'],
  [87, 'Kunal Narnolia'],
  [88, 'Bikram Pal'],
  [89, 'Karan Raj Singh'],
  [90, 'Nishant Kumar'],
  [91, 'Rahul Kumar Ram'],
  [92, 'Bistrina Sarkar'],
  [93, 'Faculty'],
  [94, 'Faculty'],
]);

const CHESS_FIXTURES = [
  [1, 55],
  [2, 76],
  [3, 58],
  [4, 88],
  [5, 86],
  [6, 91],
  [7, 46],
  [8, 59],
  [9, 41],
  [10, 83],
  [11, 63],
  [12, 80],
  [13, 60],
  [14, 77],
  [15, 66],
  [16, 51],
  [17, 72],

  [18, 49],
  [19, 42],
  [20, 89],
  [21, 68],
  [22, 65],
  [23, 67],
  [24, 57],
  [25, 61],
  [26, 74],
  [27, 70],
  [28, 64],
  [29, 79],
  [30, 69],
  [31, 45],
  [32, 71],
  [33, 52],
  [34, 84],
  [35, 85],

  [36, 56],
  [37, 90],
  [38, 82],
  [39, 92],
  [40, 87],
  [43, 81],
  [44, 73],
  [47, 53],
  [48, 75],
  [50, 78],
  [54, 62],
  [93, 94],
];

function getBadmintonTeamByPlayerName(input) {
  const allNames = BADMINTON_GIRLS_TEAMS.flatMap((t) => t.players.filter((p) => p && normalizeName(p) !== 'faculty'));
  const best = findBestNameMatch(input, allNames);
  if (!best) return null;

  const team = BADMINTON_GIRLS_TEAMS.find((t) => t.players.some((p) => normalizeName(p) === normalizeName(best)));
  if (!team) return null;

  return { teamNumber: team.team, matchedName: best };
}

function getTableTennisPlayerNumberByName(input) {
  const allNames = Array.from(TABLE_TENNIS_PLAYERS.values()).filter((n) => normalizeName(n) !== 'faculty');
  const best = findBestNameMatch(input, allNames);
  if (!best) return null;

  const entry = Array.from(TABLE_TENNIS_PLAYERS.entries()).find(([, n]) => normalizeName(n) === normalizeName(best));
  if (!entry) return null;

  return { playerNumber: entry[0], matchedName: best };
}

function getTableTennisGirlsPlayerNumberByName(input) {
  const allNames = Array.from(TABLE_TENNIS_GIRLS_PLAYERS.values()).filter((n) => normalizeName(n) !== 'faculty');
  const best = findBestNameMatch(input, allNames);
  if (!best) return null;

  const entry = Array.from(TABLE_TENNIS_GIRLS_PLAYERS.entries()).find(([, n]) => normalizeName(n) === normalizeName(best));
  if (!entry) return null;

  return { playerNumber: entry[0], matchedName: best };
}

function getChessPlayerIdsByName(input) {
  const allNames = Array.from(CHESS_PLAYERS.values()).filter((n) => normalizeName(n) !== 'faculty');
  const best = findBestNameMatch(input, allNames);
  if (!best) return null;

  const bestNorm = normalizeName(best);
  const ids = Array.from(CHESS_PLAYERS.entries())
    .filter(([, name]) => normalizeName(name) === bestNorm)
    .map(([id]) => id)
    .sort((a, b) => a - b);

  if (!ids.length) return null;
  return { ids, matchedName: best };
}

function findOpponents(fixtures, number) {
  return fixtures
    .filter(([a, b]) => a === number || b === number)
    .map(([a, b]) => (a === number ? b : a));
}

function findUniqueOpponents(fixtures, number) {
  return Array.from(new Set(findOpponents(fixtures, number)));
}

function getCarromTeamByPlayerName(input) {
  const allBoys = Array.from(CARROM_BOYS_TEAMS.entries());
  const allGirls = Array.from(CARROM_GIRLS_TEAMS.entries());

  const allNames = [
    ...allBoys.flatMap(([, players]) => players),
    ...allGirls.flatMap(([, players]) => players),
  ].filter((n) => n && normalizeName(n) !== 'faculty' && normalizeName(n) !== 'faculty member');

  const best = findBestNameMatch(input, allNames);
  if (!best) return null;

  const bestNorm = normalizeName(best);
  const boysEntry = allBoys.find(([, players]) => players.some((p) => normalizeName(p) === bestNorm));
  if (boysEntry) return { group: 'boys', teamNumber: boysEntry[0], matchedName: best };

  const girlsEntry = allGirls.find(([, players]) => players.some((p) => normalizeName(p) === bestNorm));
  if (girlsEntry) return { group: 'girls', teamNumber: girlsEntry[0], matchedName: best };

  return null;
}

function NamedFixtureList({ title, fixtures }) {
  return (
    <div className={localStyles.namedWrap} aria-label={title}>
      <div className={localStyles.namedTitle}>{title}</div>
      <div className={localStyles.namedGrid} aria-label={`${title} fixtures`}>
        {fixtures.map((m) => (
          <div key={m.label} className={localStyles.namedCard}>
            <div className={localStyles.namedTop}>
              <div className={localStyles.namedLabel}>Match</div>
              <div className={localStyles.namedNo}>{m.label}</div>
            </div>
            <div className={localStyles.namedVs}>
              <span className={localStyles.namedTeam}>{m.left}</span>
              <span className={localStyles.namedMid}>vs</span>
              <span className={localStyles.namedTeam}>{m.right}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BracketFlow({ roundTitle, roundMatches, nextTitle, nextMatches }) {
  return (
    <div className={localStyles.bracketWrap} aria-label="Cricket bracket">
      <div className={localStyles.bracket}>
        <div className={localStyles.bracketCol}>
          <div className={localStyles.bracketTitle}>{roundTitle}</div>
          {roundMatches.map((m) => (
            <div key={m.label} className={localStyles.bracketNode}>
              <div className={localStyles.bracketNodeTop}>
                <div className={localStyles.bracketNodeLabel}>Match</div>
                <div className={localStyles.bracketNodeNo}>{m.label}</div>
              </div>
              <div className={localStyles.bracketNodeBody}>
                <div className={localStyles.bracketTeam}>{m.left}</div>
                <div className={localStyles.bracketVs}>vs</div>
                <div className={localStyles.bracketTeam}>{m.right}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={localStyles.bracketCol}>
          <div className={localStyles.bracketTitle}>{nextTitle}</div>
          {nextMatches.map((m) => (
            <div key={m.label} className={localStyles.bracketNodeAlt}>
              <div className={localStyles.bracketNodeTop}>
                <div className={localStyles.bracketNodeLabel}>Match</div>
                <div className={localStyles.bracketNodeNo}>{m.label}</div>
              </div>
              <div className={localStyles.bracketNodeBody}>
                <div className={localStyles.bracketTeam}>{m.left}</div>
                <div className={localStyles.bracketVs}>vs</div>
                <div className={localStyles.bracketTeam}>{m.right}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FixtureList({ fixtures }) {
  return (
    <div className={localStyles.fixtureGrid} aria-label="Match fixtures">
      {fixtures.map(([a, b], idx) => (
        <div key={`${a}-${b}-${idx}`} className={localStyles.fixtureCard}>
          <div className={localStyles.fixtureTop}>
            <div className={localStyles.fixtureLabel}>Match</div>
            <div className={localStyles.fixtureNo}>{String(idx + 1).padStart(2, '0')}</div>
          </div>
          <div className={localStyles.fixtureVs}>
            <span className={localStyles.fixtureNum}>{a}</span>
            <span className={localStyles.fixtureMid}>vs</span>
            <span className={localStyles.fixtureNum}>{b}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Results({ title, numberLabel, numberValue, matchedName, opponentItems, hideName = false }) {
  return (
    <div className={localStyles.resultsWrap} aria-label={`${title} results`}>
      <div className={localStyles.resultsHeader}>
        <div className={localStyles.resultsTitle}>{title}</div>
        <div className={localStyles.resultsMeta}>
          <span className={localStyles.resultsChip}>{numberLabel}: {numberValue}</span>
          {!hideName ? <span className={localStyles.resultsChipAlt}>Name: {matchedName}</span> : null}
        </div>
      </div>

      {opponentItems.length ? (
        <div className={localStyles.resultsGrid}>
          {opponentItems.map((opp, i) => (
            <div key={`${opp.key}-${i}`} className={localStyles.resultCard}>
              <div className={localStyles.resultTop}>
                <div className={localStyles.resultLabel}>{opp.label || 'Opponent'}</div>
                {opp.number !== undefined && opp.number !== null ? (
                  <div className={localStyles.resultNo}>{opp.number}</div>
                ) : null}
              </div>
              <div className={localStyles.resultName}>{opp.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={localStyles.empty}>No fixture found for this number yet.</div>
      )}
    </div>
  );
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className={localStyles.modalOverlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className={localStyles.modal}>
        <div className={localStyles.modalHead}>
          <div className={localStyles.modalTitle}>{title}</div>
          <button type="button" className={localStyles.modalClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={localStyles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function SportSection({ id, title, subtitle, fixtures, mode, setMode, onFindClick, showFind = true, fixtureContent, children }) {
  const isFixtureOpen = mode === `${id}:fixture`;

  return (
    <section className={`section ${localStyles.section}`} aria-label={title}>
      <div className={localStyles.head}>
        <div className={localStyles.headText}>
          <h2 className={localStyles.title}>{title}</h2>
          <p className={localStyles.sub}>{subtitle}</p>
        </div>

        <div className={localStyles.actions} aria-label={`${title} actions`}>
          <button
            type="button"
            className={localStyles.actionBtn}
            onClick={() => setMode(isFixtureOpen ? null : `${id}:fixture`)}
          >
            Fixture
          </button>
          {showFind ? (
            <button type="button" className={localStyles.actionBtnAlt} onClick={onFindClick}>
              Find your match
            </button>
          ) : null}
        </div>
      </div>

      <ScrollableTrack
        ariaLabel={`${title} carousel`}
        className={localStyles.trackWrap}
        scrollerClassName={localStyles.track}
        step={360}
      >
        <article className={localStyles.card} aria-label={`${title} fixture card`}>
          <div className={localStyles.cardInner}>
            <div className={localStyles.cardTitle}>{title}</div>
            <div className={localStyles.cardMeta}>{isFixtureOpen ? 'Showing fixture' : 'Tap Fixture to view matches'}</div>
          </div>
        </article>

        {children}
      </ScrollableTrack>

      {isFixtureOpen ? (fixtureContent ? fixtureContent : <FixtureList fixtures={fixtures} />) : null}
    </section>
  );
}

export default function MatchesClient() {
  const [mode, setMode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSport, setActiveSport] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const badmintonByTeam = useMemo(() => {
    const map = new Map();
    for (const t of BADMINTON_GIRLS_TEAMS) map.set(t.team, t);
    return map;
  }, []);

  const openFind = (sport) => {
    setActiveSport(sport);
    setNameInput('');
    setResult(null);
    setError('');
    setModalOpen(true);
  };

  const closeFind = () => {
    setModalOpen(false);
    setActiveSport(null);
  };

  const onSubmit = () => {
    setError('');
    setResult(null);

    if (!nameInput.trim()) {
      setError('Please enter a name.');
      return;
    }

    if (activeSport === 'badminton') {
      const found = getBadmintonTeamByPlayerName(nameInput);
      if (!found) {
        setError('Name not found in Badminton Girls list. Please check spelling.');
        return;
      }

      const team = badmintonByTeam.get(found.teamNumber);
      const teammate = team
        ? team.players.find((p) => normalizeName(p) !== normalizeName(found.matchedName) && normalizeName(p) !== 'faculty')
        : null;

      const opponents = findUniqueOpponents(BADMINTON_GIRLS_FIXTURES, found.teamNumber);
      const opponentItems = [
        {
          key: `bg-teammate-${found.teamNumber}`,
          label: 'Teammate',
          number: null,
          name: teammate || 'Teammate not found',
        },
        ...opponents.map((n) => {
          const oppTeam = badmintonByTeam.get(n);
          const name = oppTeam ? `Team ${n}: ${oppTeam.players.join(' • ')}` : `Team ${n}`;
          return { key: `bg-${n}`, label: 'Opponent', number: n, name };
        }),
      ];

      setResult({
        sportTitle: 'Badminton Girls 2026',
        numberLabel: 'Team',
        numberValue: found.teamNumber,
        matchedName: found.matchedName,
        opponentItems,
      });
      return;
    }

    if (activeSport === 'tt') {
      const found = getTableTennisPlayerNumberByName(nameInput);
      if (!found) {
        setError('Name not found in Table Tennis list. Please check spelling.');
        return;
      }

      const opponents = findOpponents(TABLE_TENNIS_FIXTURES, found.playerNumber);
      const opponentItems = opponents.map((n) => {
        const name = TABLE_TENNIS_PLAYERS.get(n) || `Player ${n}`;
        return { key: `tt-${n}`, number: n, name };
      });

      setResult({
        sportTitle: 'Table Tennis',
        numberLabel: 'Player',
        numberValue: found.playerNumber,
        matchedName: found.matchedName,
        opponentItems,
      });
      return;
    }

    if (activeSport === 'tt-girls') {
      const found = getTableTennisGirlsPlayerNumberByName(nameInput);
      if (!found) {
        setError('Name not found in Table Tennis (Girls) list. Please check spelling.');
        return;
      }

      const opponents = findOpponents(TABLE_TENNIS_GIRLS_FIXTURES, found.playerNumber);
      const opponentItems = opponents.map((n) => {
        const name = TABLE_TENNIS_GIRLS_PLAYERS.get(n) || `Player ${n}`;
        return { key: `ttg-${n}`, number: n, name };
      });

      setResult({
        sportTitle: 'Table Tennis (Girls)',
        numberLabel: 'Player',
        numberValue: found.playerNumber,
        matchedName: found.matchedName,
        opponentItems,
      });
      return;
    }

    if (activeSport === 'carrom') {
      const found = getCarromTeamByPlayerName(nameInput);
      if (!found) {
        setError('Name not found in Carrom list. Please check spelling.');
        return;
      }

      const fixtures = found.group === 'girls' ? CARROM_GIRLS_R1_PAIRS : CARROM_BOYS_PAIRS;
      const teamMap = found.group === 'girls' ? CARROM_GIRLS_TEAMS : CARROM_BOYS_TEAMS;
      const teamPlayers = teamMap.get(found.teamNumber) || [];

      const teammate = teamPlayers.find(
        (p) =>
          normalizeName(p) !== normalizeName(found.matchedName) &&
          normalizeName(p) !== 'faculty' &&
          normalizeName(p) !== 'faculty member'
      );

      const opponents = findUniqueOpponents(fixtures, found.teamNumber);
      const opponentItems = [
        {
          key: `carrom-teammate-${found.group}-${found.teamNumber}`,
          label: 'Teammate',
          number: null,
          name: teammate || 'Teammate not found',
        },
        ...opponents.map((n) => {
          const oppPlayers = teamMap.get(n);
          const name = oppPlayers ? `Team ${n}: ${oppPlayers.join(' • ')}` : `Team ${n}`;
          return { key: `carrom-${found.group}-${n}`, label: 'Opponent', number: n, name };
        }),
      ];

      setResult({
        sportTitle: 'Carrom',
        numberLabel: 'Team',
        numberValue: found.teamNumber,
        matchedName: found.matchedName,
        opponentItems,
      });
      return;
    }

    if (activeSport === 'chess') {
      const found = getChessPlayerIdsByName(nameInput);
      if (!found) {
        setError('Name not found in Chess list. Please check spelling.');
        return;
      }

      const blocks = found.ids.map((playerId) => {
        const opponents = findOpponents(CHESS_FIXTURES, playerId);
        const opponentItems = opponents.map((n) => {
          const name = CHESS_PLAYERS.get(n) || `Player ${n}`;
          return { key: `ch-${n}`, number: n, name };
        });

        return {
          sportTitle: 'Chess',
          numberLabel: 'Player ID',
          numberValue: playerId,
          matchedName: found.matchedName,
          opponentItems,
        };
      });

      setResult({ multiple: true, blocks });
      return;
    }

    setError('This sport will be available soon.');
  };

  return (
    <>
      <SportSection
        id="cricket"
        title="Cricket"
        subtitle="Fixtures and bracket are shown below."
        fixtures={[]}
        mode={mode}
        setMode={setMode}
        showFind={false}
        fixtureContent={
          <>
            <NamedFixtureList title="Cricket (Girls)" fixtures={CRICKET_GIRLS_FIXTURES} />
            <NamedFixtureList title="Cricket (Boys) — Round 1" fixtures={CRICKET_BOYS_R1} />
            <NamedFixtureList title="Cricket (Boys) — Round 2" fixtures={CRICKET_BOYS_R2} />
            <BracketFlow
              roundTitle="Cricket (Boys) — Round 3"
              roundMatches={CRICKET_BOYS_R3}
              nextTitle="Cricket (Boys) — Semi Final"
              nextMatches={CRICKET_BOYS_SF}
            />
          </>
        }
      />

      <SportSection
        id="football"
        title="Football"
        subtitle="Fixtures and bracket are shown below."
        fixtures={[]}
        mode={mode}
        setMode={setMode}
        showFind={false}
        fixtureContent={
          <>
            <NamedFixtureList title="Football — Round 1" fixtures={FOOTBALL_R1} />
            <NamedFixtureList title="Football — Round 2" fixtures={FOOTBALL_R2} />
            <BracketFlow
              roundTitle="Football — Round 3"
              roundMatches={FOOTBALL_R3}
              nextTitle="Football — Semi Final"
              nextMatches={FOOTBALL_SF}
            />
            <NamedFixtureList title="Football — Final" fixtures={FOOTBALL_FINAL} />
          </>
        }
      />

      <SportSection
        id="carrom"
        title="Carrom"
        subtitle="Matches are shown by team number only."
        fixtures={[]}
        mode={mode}
        setMode={setMode}
        onFindClick={() => openFind('carrom')}
        fixtureContent={
          <>
            <NamedFixtureList title="Carrom (Girls) — Round 1" fixtures={CARROM_GIRLS_R1} />
            <NamedFixtureList title="Carrom (Boys) — Fixtures" fixtures={CARROM_BOYS_FIXTURES} />
          </>
        }
      />

      <SportSection
        id="badminton"
        title="Badminton Girls 2026"
        subtitle="Matches are shown by team number only."
        fixtures={BADMINTON_GIRLS_FIXTURES}
        mode={mode}
        setMode={setMode}
        onFindClick={() => openFind('badminton')}
      />

      <SportSection
        id="chess"
        title="Chess"
        subtitle="Matches are shown by player ID only."
        fixtures={CHESS_FIXTURES}
        mode={mode}
        setMode={setMode}
        onFindClick={() => openFind('chess')}
      />

      <SportSection
        id="tt"
        title="Table Tennis"
        subtitle="Matches are shown by player number only."
        fixtures={TABLE_TENNIS_FIXTURES}
        mode={mode}
        setMode={setMode}
        onFindClick={() => openFind('tt')}
      />

      <SportSection
        id="tt-girls"
        title="Table Tennis (Girls)"
        subtitle="Matches are shown by player number only."
        fixtures={TABLE_TENNIS_GIRLS_FIXTURES}
        mode={mode}
        setMode={setMode}
        onFindClick={() => openFind('tt-girls')}
      />

      <Modal
        open={modalOpen}
        title={
          activeSport === 'badminton'
            ? 'Find your match — Badminton Girls'
            : activeSport === 'tt'
              ? 'Find your match — Table Tennis'
              : activeSport === 'tt-girls'
                ? 'Find your match — Table Tennis (Girls)'
              : activeSport === 'chess'
                ? 'Find your match — Chess'
                : activeSport === 'carrom'
                  ? 'Find your match — Carrom'
                : 'Find your match'
        }
        onClose={closeFind}
      >
        <div className={localStyles.formRow}>
          <label className={localStyles.label} htmlFor="matchName">
            Enter your name
          </label>
          <input
            id="matchName"
            className={localStyles.input}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Type your name"
            autoComplete="name"
          />
        </div>

        {error ? <div className={localStyles.error}>{error}</div> : null}

        <div className={localStyles.modalActions}>
          <button type="button" className={localStyles.actionBtn} onClick={onSubmit}>
            Search
          </button>
          <button type="button" className={localStyles.actionBtnAlt} onClick={closeFind}>
            Close
          </button>
        </div>

        {result ? (
          result.multiple ? (
            <div className={localStyles.multiResults} aria-label="Multiple matches">
              {result.blocks.map((b) => (
                <Results
                  key={`${b.sportTitle}-${b.numberValue}`}
                  title={b.sportTitle}
                  numberLabel={b.numberLabel}
                  numberValue={b.numberValue}
                  matchedName={b.matchedName}
                  opponentItems={b.opponentItems}
                />
              ))}
            </div>
          ) : (
            <Results
              title={result.sportTitle}
              numberLabel={result.numberLabel}
              numberValue={result.numberValue}
              matchedName={result.matchedName}
              opponentItems={result.opponentItems}
              hideName={result.hideName}
            />
          )
        ) : null}
      </Modal>
    </>
  );
}
