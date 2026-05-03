/* mock-csa-data.js - Hierarchical Mock Database for NSTI LMS */

const MOCK_DATABASE = {
    "CSA": {
        "Theory": {
            "icon": "bi-journal-code",
            "subjects": {
                "PHP": {
                    "1. Introduction to PHP": {
                        "Set 1": [ 
                            { qId: "php_01_s1_01", questionText: "What does PHP stand for?", options: ["Personal Home Page", "Private Home Page", "PHP: Hypertext Preprocessor", "Preprocessor Home Page"], correctOptionIndex: 2 },
                            { qId: "php_01_s1_02", questionText: "Which symbol is used to start a PHP script?", options: ["<?php", "<script>", "<php>", "<?="], correctOptionIndex: 0 }
                        ],
                        "Set 2": [ 
                            { qId: "php_01_s2_01", questionText: "Is PHP case-sensitive for variables?", options: ["Yes", "No", "Depends on OS", "Only in PHP 8"], correctOptionIndex: 0 }
                        ],
                        "Set 3": [ 
                            { qId: "php_01_s3_01", questionText: "Who created PHP?", options: ["Tim Berners-Lee", "Brendan Eich", "Rasmus Lerdorf", "Linus Torvalds"], correctOptionIndex: 2 } 
                        ]
                    },
                    "2. PHP Variables & Data Types": {
                        "Set 1": [ 
                            { qId: "php_02_s1_01", questionText: "How do you declare a variable in PHP?", options: ["var $x", "$x = 5;", "x = 5;", "int $x"], correctOptionIndex: 1 } 
                        ],
                        "Set 2": [],
                        "Set 3": []
                    },
                    "3. PHP Operators": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "4. Control Structures (If/Else, Switch)": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "5. PHP Loops (For, While, Foreach)": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "6. PHP Functions": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "7. PHP Arrays": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "8. PHP Superglobals": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "9. PHP Forms & User Input": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "10. PHP Sessions & Cookies": { "Set 1": [], "Set 2": [], "Set 3": [] },
                    "11. PHP and MySQL Integration": { "Set 1": [], "Set 2": [], "Set 3": [] }
                },
                "Python": {
                    "Python Syntax": [
                        {
                            qId: "csa_py_001",
                            questionText: "Which keyword is used to define a function in Python?",
                            options: ["func", "def", "define", "function"],
                            correctOptionIndex: 1
                        },
                        {
                            qId: "csa_py_002",
                            questionText: "How do you insert comments in Python code?",
                            options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"],
                            correctOptionIndex: 2
                        }
                    ],
                    "Data Structures": [
                        {
                            qId: "csa_py_003",
                            questionText: "Which Python collection is ordered, changeable, and allows duplicate members?",
                            options: ["Dictionary", "Tuple", "Set", "List"],
                            correctOptionIndex: 3
                        }
                    ]
                },
                "Networking": {
                    "OSI Model": [
                        {
                            qId: "csa_net_001",
                            questionText: "How many layers are in the OSI model?",
                            options: ["5", "6", "7", "8"],
                            correctOptionIndex: 2
                        },
                        {
                            qId: "csa_net_002",
                            questionText: "Which OSI layer is responsible for logical addressing (IP)?",
                            options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
                            correctOptionIndex: 1
                        }
                    ],
                    "Protocols": [
                        {
                            qId: "csa_net_003",
                            questionText: "Which protocol is used for secure web browsing?",
                            options: ["HTTP", "FTP", "HTTPS", "SMTP"],
                            correctOptionIndex: 2
                        }
                    ]
                },
                "Database (MySQL)": {
                    "SQL Queries": [
                        {
                            qId: "csa_db_001",
                            questionText: "Which clause is used to filter records in SQL?",
                            options: ["FILTER", "WHERE", "ORDER BY", "GROUP BY"],
                            correctOptionIndex: 1
                        },
                        {
                            qId: "csa_db_002",
                            questionText: "How do you select all columns from a table named 'Users'?",
                            options: ["SELECT * FROM Users;", "SELECT ALL FROM Users;", "EXTRACT * FROM Users;", "GET Users;"],
                            correctOptionIndex: 0
                        }
                    ]
                }
            }
        },
        "POT (Principles of Teaching)": {
            "icon": "bi-person-video3",
            "subjects": {
                "Instructional Methods": {
                    "Lesson Planning": [
                        {
                            qId: "pot_lp_001",
                            questionText: "What is the primary purpose of a lesson plan?",
                            options: ["To satisfy administration", "To guide the instructor systematically during teaching", "To serve as student notes", "To record attendance"],
                            correctOptionIndex: 1
                        },
                        {
                            qId: "pot_lp_002",
                            questionText: "The 'Preparation' step in a lesson plan aims to:",
                            options: ["Test the student", "Present new material", "Motivate and connect with previous knowledge", "Summarize the lesson"],
                            correctOptionIndex: 2
                        }
                    ],
                    "Teaching Aids": [
                        {
                            qId: "pot_ta_001",
                            questionText: "Which of the following is considered a 3D teaching aid?",
                            options: ["Chalkboard", "Chart", "Working Model", "Slide Projector"],
                            correctOptionIndex: 2
                        }
                    ]
                }
            }
        },
        "Soft Skills": {
            "icon": "bi-people",
            "subjects": {
                "Communication Skills": {
                    "Verbal Communication": [
                        {
                            qId: "soft_vc_001",
                            questionText: "Which factor is critical in effective verbal communication?",
                            options: ["Speaking very fast", "Clarity of speech", "Using complex jargon", "Avoiding eye contact"],
                            correctOptionIndex: 1
                        }
                    ],
                    "Non-Verbal Communication": [
                        {
                            qId: "soft_nv_001",
                            questionText: "What percentage of communication is typically non-verbal (body language)?",
                            options: ["10%", "25%", "55%", "90%"],
                            correctOptionIndex: 2
                        },
                        {
                            qId: "soft_nv_002",
                            questionText: "Maintaining eye contact primarily demonstrates:",
                            options: ["Anger", "Boredom", "Confidence and Honesty", "Submission"],
                            correctOptionIndex: 2
                        }
                    ]
                },
                "Time Management": {
                    "Prioritization": [
                        {
                            qId: "soft_tm_001",
                            questionText: "In the Eisenhower Matrix, tasks that are 'Urgent and Important' should be:",
                            options: ["Delegated", "Done immediately", "Scheduled for later", "Eliminated"],
                            correctOptionIndex: 1
                        }
                    ]
                }
            }
        }
    },
    
    // --- STUBS FOR OTHER TRADES ---
    "Electrician": {
        "Theory": {
            "icon": "bi-lightning",
            "subjects": {
                "Basic Electricals": {
                    "Ohm's Law": [],
                    "Circuits": []
                },
                "Wiring Practice": {
                    "Industrial Wiring": []
                }
            }
        },
        "Soft Skills": {
            "icon": "bi-people",
            "subjects": {
                "Workplace Safety": {
                    "Electrical Safety": []
                }
            }
        }
    },
    "Fitter": {
        "Theory": {
            "icon": "bi-gear-wide-connected",
            "subjects": {
                "Mechanical Assembly": {
                    "Tools": [],
                    "Measurements": []
                }
            }
        }
    },
    "MMV": {
        "Theory": {
            "icon": "bi-car-front",
            "subjects": {
                "Engine Repair": {
                    "4-Stroke Engine": []
                }
            }
        }
    },
    "AI": {
        "Theory": {
            "icon": "bi-cpu",
            "subjects": {
                "Machine Learning": {
                    "Supervised Learning": []
                },
                "Python for AI": {
                    "Pandas & NumPy": []
                }
            }
        }
    },
    "Solar": {
        "Theory": {
            "icon": "bi-sun",
            "subjects": {
                "Solar Technology": {
                    "Photovoltaic Systems": []
                }
            }
        }
    }
};
