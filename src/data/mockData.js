// 模拟数据
export const mockData = {
  // 用户信息
  user: {
    name: '张同学',
    avatar: '/api/placeholder/40/40',
    role: '学生'
  },

  // 系统消息通知数据 - 简化版本
  notifications: {
    unreadCount: 1,
    messages: [
      {
        id: 1,
        type: 'course',
        title: '欢迎使用教务系统',
        content: '欢迎来到多多畅职教务原型系统！这是一个功能完整的教务管理系统演示版本。',
        time: '2024-01-15 14:30',
        isRead: false,
        priority: 'medium'
      },
      {
        id: 2,
        type: 'announcement',
        title: '系统功能说明',
        content: '您可以在左侧导航栏中体验各个功能模块，所有数据均为演示数据。',
        time: '2024-01-14 10:15',
        isRead: true,
        priority: 'low'
      }
    ]
  },

  // 个人档案详细信息
  profile: {
    name: '万圆',
    gender: '男',
    studentId: 'xxxxxxxxxx',
    avatar: '/api/placeholder/80/80',
    school: '苏州信息职业技术学院',
    major: '数据科学与大数据技术',
    courses: ['就业管家课程', '物联网', '垂直方向', 'AI+大数据'],
    badges: {
      credits: 84,
      classRank: 9,
      mbti: 'ENTP'
    }
  },

  // 学习统计数据
  studyStats: {
    myHours: 135,
    classAverage: 107,
    completionRate: 70,
    chartData: [
      { label: '我的学习时长', value: 135, color: '#10b981' },
      { label: '班级平均学习时长', value: 107, color: '#3b82f6' }
    ],
    // 新增完成率统计数据
    attendanceStats: {
      myAttendance: 90.1,
      classAverageAttendance: 65
    },
    courseCompletionStats: {
      myCourseCompletion: 92.2,
      classAverageCourseCompletion: 63
    },
    homeworkCompletionStats: {
      myHomeworkCompletion: 86,
      classAverageHomeworkCompletion: 56
    }
  },

  // 成就与推荐数据
  achievements: {
    text: [
      '你这两年学习的非常刻苦',
      '在物联网就业管家课程中',
      '单元xxxxx表现出色',
      '熟悉掌握了技术xxxx',
      '熟练运用了工具xxxx',
      '就业管家为你推荐以下配岗位'
    ],
    recommendations: [
      '岗位xxxx',
      '岗位xxxx',
      '岗位xxxx',
      '岗位xxxx'
    ]
  },

  // 日历事件数据 - 使用当前月份的日期进行演示
  calendarEvents: (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    
    return [
      {
        id: 1,
        title: '数学课程',
        startTime: `${year}-${month}-05 08:00`,
        endTime: `${year}-${month}-05 09:00`,
        type: 'class',
        color: '#3b82f6',
        description: '高等数学第三章'
      },
      {
        id: 2,
        title: '项目讨论',
        startTime: `${year}-${month}-05 14:00`,
        endTime: `${year}-${month}-05 15:30`,
        type: 'meeting',
        color: '#10b981',
        description: '毕业设计项目讨论会'
      },
      {
        id: 3,
        title: '编程实践',
        startTime: `${year}-${month}-12 10:00`,
        endTime: `${year}-${month}-12 11:30`,
        type: 'lab',
        color: '#f59e0b',
        description: 'JavaScript编程实践课'
      },
      {
        id: 4,
        title: '论文指导',
        startTime: `${year}-${month}-18 15:00`,
        endTime: `${year}-${month}-18 16:00`,
        type: 'meeting',
        color: '#ef4444',
        description: '导师论文指导'
      },
      {
        id: 5,
        title: '数据库设计',
        startTime: `${year}-${month}-25 09:00`,
        endTime: `${year}-${month}-25 10:30`,
        type: 'class',
        color: '#8b5cf6',
        description: '数据库系统原理'
      },
      {
        id: 6,
        title: '算法分析',
        startTime: `${year}-${month}-25 14:00`,
        endTime: `${year}-${month}-25 15:30`,
        type: 'class',
        color: '#3b82f6',
        description: '算法设计与分析'
      },
      {
        id: 7,
        title: '小组会议',
        startTime: `${year}-${month}-28 16:00`,
        endTime: `${year}-${month}-28 17:00`,
        type: 'meeting',
        color: '#10b981',
        description: '项目小组讨论'
      },
      {
        id: 8,
        title: '软件测试',
        startTime: `${year}-${month}-30 10:00`,
        endTime: `${year}-${month}-30 12:00`,
        type: 'lab',
        color: '#f59e0b',
        description: '软件测试实验'
      },
      {
        id: 9,
        title: '1v1求职策略定制',
        startTime: `${year}-${month}-18 14:00`,
        endTime: `${year}-${month}-18 16:00`,
        type: 'strategy',
        color: '#f59e0b',
        description: '个人求职策略制定与简历优化'
      },
      {
        id: 10,
        title: '线下面试模拟',
        startTime: `${year}-${month}-25 15:30`,
        endTime: `${year}-${month}-25 17:00`,
        type: 'interview',
        color: '#ef4444',
        description: '模拟技术面试环节'
      }
    ];
  })(),

  // 日历配置
  calendarConfig: {
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    weekDaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    timeSlots: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`),
    defaultView: 'month',
    firstDayOfWeek: 0,
    eventTypes: {
      class: { name: '课程', color: '#10b981' },  // 绿色
      meeting: { name: '会议', color: '#3b82f6' },
      lab: { name: '实验', color: '#3b82f6' },
      exam: { name: '考试', color: '#ef4444' },
      strategy: { name: '1v1求职策略定制', color: '#f59e0b' }, // 橙色
      interview: { name: '线下面试模拟', color: '#ef4444' }, // 红色
      other: { name: '其他', color: '#8b5cf6' }
    }
  },

  // 课程数据
  courses: [
    {
      id: 1,
      courseId: 101,
      name: '数据库系统原理',
      teacher: '李教授',
      time: '09:00-10:30',
      status: '进行中',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      courseId: 102,
      name: 'SQL语言基础',
      teacher: '李教授',
      time: '昨天 14:00-15:30',
      status: '已结束',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      courseId: 201,
      name: '数据库优化技术',
      teacher: '王教授',
      time: '前天 16:00-17:30',
      status: '已结束',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      courseId: 202,
      name: '分布式数据库',
      teacher: '王教授',
      time: '明天 10:00-11:30',
      status: '即将开始',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 5,
      courseId: 301,
      name: '数据挖掘算法',
      teacher: '陈教授',
      time: '后天 14:00-15:30',
      status: '待开始',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 6,
      courseId: 401,
      name: '机器学习基础',
      teacher: '张教授',
      time: '上周三 09:00-10:30',
      status: '已结束',
      avatar: '/api/placeholder/40/40'
    }
  ],

  // 待办事项
  todos: [
    { id: 1, task: '完成数学作业', deadline: '今天 18:00' },
    { id: 2, task: '准备计算机网络实验', deadline: '明天 10:00' },
    { id: 3, task: '复习数据结构', deadline: '后天 14:00' }
  ],

  // 快捷入口 - 新用户初始状态
  quickAccess: [
    { id: 1, name: '就业管家知识树', icon: '🌳', path: '/career-tree', accessCount: 0 },
    { id: 2, name: '课程直播间', icon: '📺', path: '/live', accessCount: 0 },
    { id: 3, name: '专家支持中心', icon: '🎯', path: '/expert-support', accessCount: 0 }
  ],

  // 所有可用的快捷入口选项（用于动态排序）
  allQuickAccessOptions: [
    { id: 1, name: '就业管家知识树', icon: '🌳', path: '/career-tree', accessCount: 0 },
    { id: 2, name: '课程直播间', icon: '📺', path: '/live', accessCount: 5 },
    { id: 3, name: '专家支持中心', icon: '🎯', path: '/expert-support', accessCount: 2 },
    { id: 4, name: '课后作业', icon: '📝', path: '/homework', accessCount: 8 },
    { id: 5, name: '日历', icon: '📅', path: '/calendar', accessCount: 12 },
    { id: 6, name: '我的简历与面试题', icon: '📄', path: '/resume-interview', accessCount: 3 },
    { id: 7, name: '项目库', icon: '📂', path: '/project-library', accessCount: 1 }
  ],

  // 学习进度
  studyProgress: {
    completed: 72,
    total: 100,
    percentage: 72
  },

  // 班级排名
  classRanking: [
    { id: 1, name: '小明', score: 95, rank: 1 },
    { id: 2, name: '小华', score: 92, rank: 2 },
    { id: 3, name: '小李', score: 89, rank: 3 },
    { id: 4, name: '小王', score: 86, rank: 4 },
    { id: 5, name: '小张', score: 83, rank: 5 }
  ],

  // 事项列表
  tasks: [
    {
      id: 1,
      teacher: '李教授',
      time: '下午16:40',
      course: '高等数学课程作业',
      type: '作业提交',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      teacher: '王老师',
      time: '下午18:20',
      course: '计算机网络实验报告',
      type: '实验报告',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      teacher: '陈教授',
      time: '明天09:00',
      course: '数据结构课程设计',
      type: '课程设计',
      avatar: '/api/placeholder/40/40'
    }
  ],

  // 增强的任务数据 - 支持日期关联和状态管理
  enhancedTasks: (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    
    return [
      {
        id: 1,
        title: '高等数学课程作业',
        teacher: '李教授',
        time: '16:40',
        date: `${year}-${month}-05`,
        type: '作业提交',
        status: 'pending',
        description: '完成第三章习题1-15题',
        priority: 'high'
      },
      {
        id: 2,
        title: '计算机网络实验报告',
        teacher: '王老师',
        time: '18:20',
        date: `${year}-${month}-05`,
        type: '实验报告',
        status: 'in-progress',
        description: '网络协议分析实验报告',
        priority: 'medium'
      },
      {
        id: 3,
        title: '数据结构课程设计',
        teacher: '陈教授',
        time: '09:00',
        date: `${year}-${month}-12`,
        type: '课程设计',
        status: 'pending',
        description: '设计并实现二叉搜索树',
        priority: 'high'
      },
      {
        id: 4,
        title: '1v1求职策略定制',
        teacher: '职业导师',
        time: '14:00',
        date: `${year}-${month}-18`,
        type: 'strategy',
        status: 'pending',
        description: '个人求职策略制定与简历优化',
        priority: 'high'
      },
      {
        id: 5,
        title: '线下面试模拟',
        teacher: '面试官',
        time: '15:30',
        date: `${year}-${month}-25`,
        type: 'interview',
        status: 'pending',
        description: '模拟技术面试环节',
        priority: 'high'
      },
      {
        id: 6,
        title: '英语口语练习',
        teacher: '外教老师',
        time: '10:00',
        date: `${year}-${month}-28`,
        type: '作业提交',
        status: 'completed',
        description: '日常英语对话练习',
        priority: 'low'
      }
    ];
  })(),

  // 日历数据
  calendar: {
    currentMonth: '2024年1月',
    today: 15,
    events: [
      { date: 10, type: 'exam' },
      { date: 15, type: 'today' },
      { date: 20, type: 'assignment' },
      { date: 25, type: 'holiday' }
    ]
  },

  // 导航菜单数据
  navigation: {
    sections: [
      {
        title: '个人区块',
        items: [
          { name: '🏠 主页', path: '/', active: true },
          { name: '👤 个人档案', path: '/profile' },
          { name: '📅 日历', path: '/calendar' }
        ]
      },
      {
        title: '课程区块',
        items: [
          { name: '📺 课程直播间', path: '/live' },
          { name: '🌳 就业管家知识树', path: '/career-tree' },
          { name: '📝 课后作业', path: '/homework' },
          { name: '🎯 1V1定制求职策略', path: '/job-strategy' },
          { name: '🎭 线下面试模拟', path: '/interview-simulation' },
          { name: '🏥 专家支持中心', path: '/expert-support' }
        ]
      },
      {
        title: '资源区块',
        items: [
          { name: '🏢 企业内推岗位', path: '/company-jobs' },
          { name: '📄 我的简历与面试题', path: '/resume-interview' },
          { name: '📚 我的项目库', path: '/project-library' }
        ]
      }
    ]
  },

  // 学习计划配置
  learningPlan: {
    // 学生学习计划总开始日期（注册/加入计划之日）
    startDate: '2024-01-01', // 示例：2024年1月1日开始
    studentId: 'STU001',
    studentName: '张同学'
  },

  // 学习阶段信息 - 符合需求文档的完整数据结构
  learningStages: [
    { 
      id: 1,
      name: '生涯启航阶段', 
      duration: 4, // 月数
      description: '基础技能建立期',
      // 时间字段 - 根据学习计划开始日期自动计算
      startDate: '2024-01-01',
      endDate: '2024-05-01',
      // 状态字段
      status: 'completed', // completed | in_progress | locked | stalled
      progressPercentage: 100 // 基于时间计算的进度百分比
    },
    { 
      id: 2,
      name: '能力跃升阶段', 
      duration: 8, // 月数 - 是其他阶段的两倍
      description: '核心能力发展期',
      startDate: '2024-05-01',
      endDate: '2025-01-01',
      status: 'in_progress',
      progressPercentage: 75 // 示例：当前进度75%
    },
    { 
      id: 3,
      name: '垂直精进阶段', 
      duration: 4, // 月数
      description: '专业深度提升期',
      startDate: '2025-01-01',
      endDate: '2025-05-01',
      status: 'locked', // 需要完成"垂直方向选择"里程碑才能解锁
      progressPercentage: 0,
      // 解锁条件
      prerequisiteMilestone: 'vertical-direction-selection'
    },
    { 
      id: 4,
      name: '决胜求职阶段', 
      duration: 4, // 月数
      description: '就业准备冲刺期',
      startDate: '2025-05-01',
      endDate: '2025-09-01',
      status: 'locked',
      progressPercentage: 0
    }
  ],

  // 关键里程碑事件定义
  milestones: [
    {
      id: 'vertical-direction-selection',
      name: '垂直方向选择',
      description: '选择专业发展的垂直方向',
      // 位置：能力跃升阶段和垂直精进阶段的交界处
      position: {
        afterStageId: 2, // 能力跃升阶段之后
        beforeStageId: 3 // 垂直精进阶段之前
      },
      // 状态
      status: 'pending', // pending | completed
      completedDate: null,
      // 交互配置
      interaction: {
        clickable: true,
        targetRoute: '/career-tree', // 点击跳转到就业管家知识树
        targetModule: '就业管家知识树'
      },
      // 视觉配置
      visual: {
        icon: '★', // 星形图标
        pendingStyle: {
          color: '#ef4444', // 红色
          animation: 'blink', // 闪烁效果
          fillType: 'outline' // 轮廓线
        },
        completedStyle: {
          color: '#fbbf24', // 金色
          fillType: 'filled' // 填充
        }
      }
    }
  ],

  // 保留原有阶段信息以兼容其他模块
  stages: [
    { name: '基础阶段', active: false },
    { name: '进阶阶段', active: true },
    { name: '提高阶段', active: false },
    { name: '冲刺阶段', active: false }
  ],

  // 直播相关数据
  courseUnits: [
    {
      id: 1,
      title: '数据库基础',
      isExpanded: true,
      courses: [
        {
          id: 101,
          title: '数据库系统原理',
          teacher: '李教授',
          date: '2023.09.01',
          time: '14:00-15:30',
          status: 'live',
          viewCount: 1205,
          thumbnail: '/api/placeholder/120/80',
          startTime: '2023-09-01 14:00',
          endTime: '2023-09-01 15:30',
          description: '本课程主要讲解数据库系统的基本原理和设计方法'
        },
        {
          id: 102,
          title: 'SQL语言基础',
          teacher: '李教授',
          date: '2023.09.03',
          time: '10:00-11:30',
          status: 'upcoming',
          viewCount: 0,
          thumbnail: '/api/placeholder/120/80',
          startTime: '2023-09-03 10:00',
          endTime: '2023-09-03 11:30',
          description: 'SQL语言的基本语法和数据操作'
        }
      ]
    },
    {
      id: 2,
      title: '高级数据库',
      isExpanded: false,
      courses: [
        {
          id: 201,
          title: '数据库优化技术',
          teacher: '王教授',
          date: '2023.09.05',
          time: '16:00-17:30',
          status: 'completed',
          viewCount: 856,
          thumbnail: '/api/placeholder/120/80',
          startTime: '2023-09-05 16:00',
          endTime: '2023-09-05 17:30',
          description: '数据库性能优化和索引设计'
        },
        {
          id: 202,
          title: '分布式数据库',
          teacher: '王教授',
          date: '2023.09.07',
          time: '14:00-15:30',
          status: 'upcoming',
          viewCount: 0,
          thumbnail: '/api/placeholder/120/80',
          startTime: '2023-09-07 14:00',
          endTime: '2023-09-07 15:30',
          description: '分布式数据库系统架构和设计'
        }
      ]
    },
    {
      id: 3,
      title: '数据挖掘',
      isExpanded: false,
      courses: [
        {
          id: 301,
          title: '数据挖掘算法',
          teacher: '陈教授',
          date: '2023.09.10',
          time: '09:00-10:30',
          status: 'upcoming',
          viewCount: 0,
          thumbnail: '/api/placeholder/120/80',
          startTime: '2023-09-10 09:00',
          endTime: '2023-09-10 10:30',
          description: '常用数据挖掘算法原理和应用'
        }
      ]
    }
  ],

  // 当前直播信息
  currentLive: {
    courseId: 101,
    title: '数据库系统原理',
    teacher: '李教授',

    startTime: '2023-09-01 14:00',
    viewers: 1205,
    description: '本课程主要讲解数据库系统的基本原理和设计方法，涵盖关系数据库理论、SQL语言、数据库设计、事务处理、并发控制等核心内容。通过理论学习和实践操作，帮助学生掌握数据库系统的核心技术。',
    status: 'live',
    duration: '1小时30分钟'
  },

  // 直播状态配置
  liveConfig: {
    statusTypes: {
      live: { name: '直播中', color: '#ef4444', bgColor: '#fef2f2' },
      upcoming: { name: '即将开始', color: '#f59e0b', bgColor: '#fffbeb' },
      completed: { name: '已结束', color: '#6b7280', bgColor: '#f9fafb' },
      replay: { name: '课程回放中', color: '#8b5cf6', bgColor: '#f3f4f6' }
    },
    playerSettings: {
      autoplay: true,
      controls: true,
      responsive: true,
      aspectRatio: '16:9'
    }
  },

  // 就业管家知识树数据
  careerTree: {
    title: '就业管家知识树',
    centerSections: [
      {
        id: 1,
        title: '产业认知课',
        expanded: true,
        child: [
          {
            unit_id: 1,
            unit_name: '互联网行业概述',
            course_list: [
              {
                id: 1,
                course_name: '互联网发展史',
                is_ai: true,
                currentPoster: 1
              },
              {
                id: 2,
                course_name: '行业分析方法',
                is_ai: false,
                currentPoster: 2
              },
              {
                id: 3,
                course_name: '技术趋势解读',
                is_ai: true,
                currentPoster: 3
              }
            ],
            resume_resources: '高级产品经理简历\n资深运营经理简历\n技术总监简历',
            portfolio_resources: '产品设计作品集\n运营案例合集\n技术项目展示',
            tools: 'Axure RP\nFigma\nSketch\nXmind',
            advanced_learning_resources: '产品思维训练\n数据分析进阶\n用户体验设计'
          },
          {
            unit_id: 2,
            unit_name: '技术架构基础',
            course_list: [
              {
                id: 4,
                course_name: '前端技术栈',
                is_ai: true,
                currentPoster: 4
              },
              {
                id: 5,
                course_name: '后端架构设计',
                is_ai: false,
                currentPoster: 5
              }
            ],
            resume_resources: '前端工程师简历\n全栈工程师简历\n架构师简历',
            portfolio_resources: '前端项目作品\n全栈应用展示\n架构设计文档',
            tools: 'VS Code\nGit\nDocker\nKubernetes',
            advanced_learning_resources: '微服务架构\n性能优化\n系统设计'
          },
          {
            unit_id: 3,
            unit_name: '市场竞争分析',
            course_list: [
              {
                id: 6,
                course_name: '竞品分析方法',
                is_ai: false,
                currentPoster: 6
              },
              {
                id: 7,
                course_name: '用户需求调研',
                is_ai: true,
                currentPoster: 7
              }
            ],
            resume_resources: '市场分析师简历\n用户研究员简历\n产品运营简历',
            portfolio_resources: '竞品分析报告\n用户调研案例\n市场洞察文档',
            tools: 'Questionnaire Star\nUser Interviews\nGoogle Forms\nSurvey Monkey',
            advanced_learning_resources: '市场趋势分析\n用户行为学\n商业模式设计'
          }
        ]
      },
      {
        id: 2,
        title: '产业技能课',
        expanded: false,
        child: [
          {
            unit_id: 3,
            unit_name: '编程技能提升',
            course_list: [
              {
                id: 8,
                course_name: 'JavaScript高级特性',
                is_ai: true,
                currentPoster: 8
              },
              {
                id: 9,
                course_name: 'React框架实战',
                is_ai: true,
                currentPoster: 9
              },
              {
                id: 10,
                course_name: 'Node.js后端开发',
                is_ai: false,
                currentPoster: 10
              }
            ],
            resume_resources: '高级前端工程师简历\nReact专家简历\nNode.js开发者简历',
            portfolio_resources: 'React项目作品\nNode.js应用\n全栈项目展示',
            tools: 'React DevTools\nWebpack\nBabel\nESLint',
            advanced_learning_resources: 'React源码解析\nNode.js性能优化\n前端工程化'
          },
          {
            unit_id: 4,
            unit_name: '数据库与云服务',
            course_list: [
              {
                id: 11,
                course_name: 'MySQL数据库优化',
                is_ai: false,
                currentPoster: 11
              },
              {
                id: 12,
                course_name: 'Redis缓存实战',
                is_ai: true,
                currentPoster: 12
              }
            ],
            resume_resources: '数据库工程师简历\n运维工程师简历\n云架构师简历',
            portfolio_resources: '数据库设计案例\n缓存优化方案\n云服务部署',
            tools: 'MySQL Workbench\nRedis Desktop Manager\nAWS\nAliyun',
            advanced_learning_resources: '数据库内核\n分布式缓存\n云原生架构'
          },
          {
            unit_id: 5,
            unit_name: '开发工具与流程',
            course_list: [
              {
                id: 13,
                course_name: '版本控制系统',
                is_ai: false,
                currentPoster: 13
              },
              {
                id: 14,
                course_name: '自动化测试',
                is_ai: true,
                currentPoster: 14
              },
              {
                id: 15,
                course_name: '持续集成部署',
                is_ai: true,
                currentPoster: 15
              }
            ],
            resume_resources: 'DevOps工程师简历\n测试工程师简历\n运维开发简历',
            portfolio_resources: 'CI/CD流水线\n自动化测试套件\n部署脚本集',
            tools: 'Git\nJenkins\nDocker\nKubernetes\nSonarQube',
            advanced_learning_resources: 'DevOps最佳实践\n容器化部署\n服务网格'
          }
        ]
      },
      {
        id: 3,
        title: '项目实战课',
        expanded: false,
        child: [
          {
            unit_id: 6,
            unit_name: '企业级项目开发',
            course_list: [
              {
                id: 16,
                course_name: '电商平台开发',
                is_ai: true,
                currentPoster: 16
              },
              {
                id: 17,
                course_name: '内容管理系统',
                is_ai: false,
                currentPoster: 17
              },
              {
                id: 18,
                course_name: '移动应用开发',
                is_ai: true,
                currentPoster: 18
              }
            ],
            resume_resources: '项目经理简历\n技术负责人简历\n全栈工程师简历\n移动端开发简历',
            portfolio_resources: '电商项目展示\nCMS系统演示\n项目管理文档\n移动应用作品',
            tools: 'Jira\nConfluence\nGitLab\nJenkins\nAndroid Studio',
            advanced_learning_resources: '项目管理实践\n敏捷开发\n持续集成\n移动端架构'
          },
          {
            unit_id: 7,
            unit_name: '数据分析项目',
            course_list: [
              {
                id: 19,
                course_name: '大数据平台搭建',
                is_ai: true,
                currentPoster: 19
              },
              {
                id: 20,
                course_name: '机器学习实战',
                is_ai: true,
                currentPoster: 20
              }
            ],
            resume_resources: '数据分析师简历\n算法工程师简历\n大数据工程师简历',
            portfolio_resources: '数据分析报告\n机器学习模型\n数据可视化作品',
            tools: 'Python\nJupyter\nTableau\nSpark\nHadoop',
            advanced_learning_resources: '深度学习\n数据挖掘\n分布式计算'
          },
          {
            unit_id: 8,
            unit_name: '创新产品设计',
            course_list: [
              {
                id: 21,
                course_name: 'AI产品设计',
                is_ai: true,
                currentPoster: 21
              },
              {
                id: 22,
                course_name: '用户体验优化',
                is_ai: false,
                currentPoster: 22
              }
            ],
            resume_resources: '产品经理简历\nUX设计师简历\nAI产品专家简历',
            portfolio_resources: 'AI产品原型\n用户研究报告\n设计系统文档',
            tools: 'Figma\nSketch\nProtoPie\nMiro\nAxure',
            advanced_learning_resources: 'AI产品策略\n用户心理学\n设计思维'
          }
        ]
      },
      {
        id: 4,
        title: '就业指导课',
        expanded: false,
        child: [
          {
            unit_id: 9,
            unit_name: '简历优化与包装',
            course_list: [
              {
                id: 23,
                course_name: '简历写作技巧',
                is_ai: false,
                currentPoster: 23
              },
              {
                id: 24,
                course_name: '作品集制作',
                is_ai: true,
                currentPoster: 24
              }
            ],
            resume_resources: '技术类简历模板\n产品类简历模板\n设计类简历模板',
            portfolio_resources: '技术作品集\n产品作品集\n设计作品集',
            tools: 'Canva\nAdobe Suite\nGitHub Pages\nNotion',
            advanced_learning_resources: '个人品牌打造\n职业规划\n行业洞察'
          },
          {
            unit_id: 10,
            unit_name: '面试技巧训练',
            course_list: [
              {
                id: 25,
                course_name: '技术面试准备',
                is_ai: true,
                currentPoster: 25
              },
              {
                id: 26,
                course_name: '行为面试技巧',
                is_ai: false,
                currentPoster: 26
              }
            ],
            resume_resources: '面试官简历\nHR专员简历\n技术面试官简历',
            portfolio_resources: '面试案例集\n答题技巧\n模拟面试视频',
            tools: 'Zoom\nTencent Meeting\nLeetCode\nHackerRank',
            advanced_learning_resources: '薪资谈判\n职场沟通\n压力面试应对'
          }
        ]
      },
      {
        id: 5,
        title: '职业发展课',
        expanded: false,
        child: [
          {
            unit_id: 11,
            unit_name: '职场软技能',
            course_list: [
              {
                id: 27,
                course_name: '团队协作能力',
                is_ai: false,
                currentPoster: 27
              },
              {
                id: 28,
                course_name: '沟通表达技巧',
                is_ai: true,
                currentPoster: 28
              }
            ],
            resume_resources: '团队领导简历\n项目协调员简历\n培训师简历',
            portfolio_resources: '团队项目案例\n沟通培训材料\n领导力展示',
            tools: 'Slack\nTrello\nZoom\nMindMeister',
            advanced_learning_resources: '领导力培养\n冲突管理\n跨文化沟通'
          },
          {
            unit_id: 12,
            unit_name: '行业趋势分析',
            course_list: [
              {
                id: 29,
                course_name: '技术发展趋势',
                is_ai: true,
                currentPoster: 29
              },
              {
                id: 30,
                course_name: '市场需求分析',
                is_ai: false,
                currentPoster: 30
              }
            ],
            resume_resources: '行业分析师简历\n市场研究员简历\n战略顾问简历',
            portfolio_resources: '行业报告\n趋势分析\n市场调研',
            tools: 'Google Analytics\nSimilarWeb\nCrunchbase\nPitchBook',
            advanced_learning_resources: '商业分析\n战略思维\n创新管理'
          }
        ]
      }
    ],
    rightResourcesAll: [
      {
        title: '简历资源',
        items: [],
        key: 'resume_resources',
        order: 1
      },
      {
        title: '作品集资源',
        items: [],
        key: 'portfolio_resources',
        order: 2
      },
      {
        title: '工具资源',
        items: [],
        key: 'tools',
        order: 3
      },
      {
        title: '进阶学习资料',
        items: [],
        key: 'advanced_learning_resources',
        order: 4
      }
    ]
  },

  // 课后作业数据
  homework: {
    title: '综合能力培养',
    subtitle: '通过系统性的技能训练，全面提升个人综合能力',
     skills: [
      { id: 1, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 2, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 3, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 4, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 5, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 6, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 7, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 8, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 9, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 10, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 11, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 },
      { id: 12, name: '理性规划技术未来培养主要工艺路线', level: 'completed', progress: 100 }
    ],
    verticalSkills: [
      { id: 1, name: '理性规划技术未来培养主要工艺路线', level: 'in-progress', progress: 60 },
      { id: 2, name: '理性规划技术未来培养主要工艺路线', level: 'in-progress', progress: 40 },
      { id: 3, name: '理性规划技术未来培养主要工艺路线', level: 'in-progress', progress: 75 },
      { id: 4, name: '理性规划技术未来培养主要工艺路线', level: 'in-progress', progress: 25 },
      { id: 5, name: '理性规划技术未来培养主要工艺路线', level: 'in-progress', progress: 90 },
      { id: 6, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 7, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 8, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 9, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 10, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 11, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 12, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 13, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 14, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 },
      { id: 15, name: '理性规划技术未来培养主要工艺路线', level: 'locked', progress: 0 }
    ]
  },

  // 1v1定制求职策略数据
  jobStrategy: {
    title: '1v1定制求职策略',
     isLocked: true,
    lockMessage: '还没收到了"综合能力培养"，你的综合能力有所欠缺',
    lockSubMessage: '您还在低收费阶段进行1v1求职策略咨询',
    requirements: ['基础求职技能', '简历优化', '面试技巧', '薪资谈判']
  },

  // 线上面试模拟数据
  interviewSimulation: {
    title: '线上面试模拟',
    interviewList: [
      {
        id: 1,
        company: '阿里巴巴',
        position: '前端开发工程师',
        date: '2024-01-15',
        time: '14:30',
        status: 'evaluated',
        videoUrl: '/live.mp4',
        interviewer: '张经理',
        duration: '32:15'
      },
      {
        id: 2,
        company: '腾讯',
        position: 'React开发工程师', 
        date: '2024-01-12',
        time: '10:00',
        status: 'evaluated',
        videoUrl: '/live.mp4',
        interviewer: '李总监',
        duration: '28:43'
      },
      {
        id: 3,
        company: '字节跳动',
        position: '全栈工程师',
        date: '2024-01-10', 
        time: '16:00',
        status: 'completed',
        videoUrl: '/live.mp4',
        interviewer: '王主管',
        duration: '35:20'
      },
      {
        id: 4,
        company: '美团',
        position: 'Vue.js开发工程师',
        date: '2024-01-08',
        time: '09:30',
        status: 'evaluated',
        videoUrl: '/live.mp4', 
        interviewer: '陈经理',
        duration: '30:45'
      },
      {
        id: 5,
        company: '滴滴出行',
        position: '前端架构师',
        date: '2024-01-05',
        time: '15:00', 
        status: 'completed',
        videoUrl: '/live.mp4',
        interviewer: '刘总监',
        duration: '40:12'
      }
    ],
    currentInterview: null,
    evaluationData: {
      scores: [
        { category: '技术能力', score: 85, total: 100, description: '基础扎实，框架理解到位' },
        { category: '沟通表达', score: 78, total: 100, description: '表达清晰，逻辑性强' },
        { category: '问题解决', score: 82, total: 100, description: '思路清晰，方案合理' },
        { category: '团队协作', score: 80, total: 100, description: '有良好的团队意识' }
      ],
      totalScore: 325,
      totalPossible: 400,
      hrComments: [
        {
          interviewer: '张经理',
          comment: '候选人技术基础扎实，对React生态有深入理解，代码风格良好。建议加强算法训练。',
          timestamp: '2024-01-15 15:30'
        },
        {
          interviewer: '技术总监',
          comment: '整体表现不错，有一定的项目经验，能够独立思考问题。建议多关注新技术发展趋势。',
          timestamp: '2024-01-15 15:45'
        }
      ],
      recommendation: 'pass',
      nextSteps: '建议进入终面环节，安排与部门负责人面谈。'
    }
  },

  // 专家支持中心数据
  expertSupport: {
    title: '专家支持中心',
    subtitle: 'Expert Tutor Support Center',
    categories: [
      { id: 1, name: '专业咨询', isActive: true },
      { id: 2, name: '技术指导', isActive: false },
      { id: 3, name: '24小时服务', isActive: false }
    ],
    experts: [
      {
        id: 1,
        name: '多多教务数据系统',
        avatar: '/api/placeholder/60/60',
        time: '2023-09-07 13:11',
        message: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...',
        isBot: true
      },
      {
        id: 2,
        name: '张老师',
        avatar: '/api/placeholder/60/60',
        time: '2023-09-07 14:20',
        message: '收到-项目需求的设计图----项目需求的设计图----项目需求的设计图...',
        isBot: false
      }
    ],
    promotion: {
      title: '学有所问，向专有答',
      subtitle: '有问题联系专家咨询吧',
      buttonText: '联系专家',
      topics: ['基础概念', '技术分析', '问题排查', '性能优化', '架构设计']
    }
  },

  // 企业内推岗位数据
  companyJobs: {
    title: '企业内推岗位',
    subtitle: '基于AI智能匹配的企业内推岗位推荐系统',
    companyPositions: [
      {
        id: 1,
        company: '苏州信息科技有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '岗位信息录入机收录名',
        isRecommended: true,
        details: {
          location: '苏州市高新区',
          experience: '1-3年',
          education: '本科及以上',
          positions: '5人',
          description: '作为物联网实施工程师，您将负责物联网解决方案的部署、实施和维护工作。主要职责包括物联网设备的安装调试、系统架构设计、项目部署上线、技术支持和故障排除等。',
          requirements: [
            '本科及以上学历，计算机、电子工程、通信工程等相关专业',
            '熟悉物联网技术架构，了解传感器、网关、云平台等核心组件',
            '具备Linux系统操作经验，熟悉常用网络协议（TCP/IP、HTTP、MQTT等）',
            '有嵌入式开发或硬件调试经验者优先',
            '具备良好的沟通协调能力和团队合作精神',
            '责任心强，具备较强的学习能力和问题解决能力'
          ],
          benefits: ['五险一金', '双休', '年终奖金', '带薪年假', '员工培训', '弹性工作', '团队建设', '节日福利'],
          companyInfo: '苏州信息科技有限公司是一家专注于物联网技术解决方案的高新技术企业，致力于为各行业客户提供专业的物联网产品和服务。公司拥有完善的技术团队和丰富的项目经验，在智能制造、智慧城市、智能家居等领域有着广泛的应用案例。'
        }
      },
      {
        id: 2,
        company: '华为技术有限公司',
        position: '物联网实施工程师', 
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '岗位信息录入机收录名',
        isRecommended: false,
        details: {
          location: '苏州市工业园区',
          experience: '2-5年',
          education: '本科及以上',
          positions: '3人',
          description: '负责华为物联网解决方案的项目实施，包括设备安装调试、系统配置、客户培训等工作。与团队协作完成大型物联网项目的部署和交付。',
          requirements: [
            '本科及以上学历，通信工程、计算机相关专业',
            '2年以上物联网或通信行业工作经验',
            '熟悉华为物联网产品和解决方案',
            '具备良好的客户沟通和技术支持能力',
            '能够适应项目出差要求'
          ],
          benefits: ['五险一金', '双休', '股票期权', '年终奖', '员工培训', '健身房', '班车接送', '餐饮补贴'],
          companyInfo: '华为技术有限公司是全球领先的ICT（信息与通信）基础设施和智能终端提供商，致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界。'
        }
      },
      {
        id: 3,
        company: '中兴通讯股份有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '',
        isRecommended: false,
        details: {
          location: '苏州市相城区',
          experience: '1-3年',
          education: '本科及以上',
          positions: '2人',
          description: '参与中兴通讯物联网产品的现场实施工作，负责设备安装、系统集成、技术调试等工作，为客户提供专业的技术服务。',
          requirements: [
            '本科及以上学历，电子信息、通信工程等相关专业',
            '熟悉物联网技术栈和通信协议',
            '有项目实施或技术支持经验优先',
            '具备较强的学习能力和团队合作精神',
            '良好的英语读写能力'
          ],
          benefits: ['五险一金', '双休', '年终奖', '补充医疗', '员工食堂', '技能培训', '晋升通道'],
          companyInfo: '中兴通讯是全球领先的综合通信解决方案提供商，为全球电信运营商、政企客户和消费者提供创新的技术与产品解决方案。'
        }
      },
      {
        id: 4,
        company: '腾讯科技有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '岗位信息录入机收录名',
        isRecommended: true,
        details: {
          location: '苏州市工业园区',
          experience: '2-4年',
          education: '本科及以上',
          positions: '4人',
          description: '负责腾讯云IoT平台相关产品的客户项目实施，包括方案设计、设备接入、数据处理、应用开发等全流程技术支持工作。',
          requirements: [
            '本科及以上学历，计算机、物联网、自动化相关专业',
            '熟悉腾讯云IoT产品和服务',
            '具备编程能力，熟悉Java、Python等语言',
            '有云计算或物联网项目经验者优先',
            '优秀的问题分析和解决能力'
          ],
          benefits: ['五险一金', '双休', '股票激励', '年终奖', '免费三餐', '健身房', '班车', '带薪年假', '培训津贴'],
          companyInfo: '腾讯是一家世界领先的互联网科技公司，用创新的产品和服务提升全球各地人们的生活品质。腾讯云为数百万的企业和开发者提供安全稳定的云计算服务。'
        }
      },
      {
        id: 5,
        company: '阿里巴巴集团',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '岗位信息录入机收录名',
        isRecommended: true,
        details: {
          location: '苏州市工业园区',
          experience: '1-3年',
          education: '本科及以上',
          positions: '6人',
          description: '负责阿里云IoT平台和边缘计算产品的客户项目交付，协助客户完成物联网解决方案的部署实施，提供技术咨询和支持服务。',
          requirements: [
            '本科及以上学历，理工科相关专业',
            '了解阿里云IoT产品体系',
            '熟悉Linux操作系统和网络知识',
            '有嵌入式开发或云计算经验优先',
            '良好的客户服务意识和沟通能力'
          ],
          benefits: ['五险一金', '双休', '股权激励', '年终奖', '免费餐饮', '健身房', '班车', '补充医疗', '子女教育支持'],
          companyInfo: '阿里巴巴集团是以技术驱动，以成就客户、赋能他人为使命的数字经济体。阿里云是全球三大云计算服务商之一，为数百万客户提供专业的云计算服务。'
        }
      },
      {
        id: 6,
        company: '百度在线网络技术有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '岗位信息录入机收录名',
        isRecommended: false,
        details: {
          location: '苏州市高新区',
          experience: '2-5年',
          education: '本科及以上',
          positions: '3人',
          description: '负责百度智能云IoT产品的现场部署和技术支持，协助客户完成智能设备接入、数据分析、AI算法集成等工作。',
          requirements: [
            '本科及以上学历，计算机、电子工程等相关专业',
            '熟悉百度智能云产品和AI技术',
            '有物联网项目实施经验',
            '具备Python或Java编程能力',
            '良好的学习能力和技术钻研精神'
          ],
          benefits: ['五险一金', '双休', '期权激励', '年终奖', '免费午餐', '健身房', '技术培训', '弹性工作'],
          companyInfo: '百度是拥有强大互联网基础的领先AI公司，百度智能云为企业提供全栈AI能力和解决方案，助力产业智能化升级。'
        }
      },
      {
        id: 7,
        company: '京东科技有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '',
        isRecommended: false,
        details: {
          location: '苏州市相城区',
          experience: '1-3年',
          education: '本科及以上',
          positions: '2人',
          description: '参与京东物联网和智能供应链项目的技术实施，负责设备接入、数据采集、系统集成等技术工作，为零售和物流行业提供IoT解决方案。',
          requirements: [
            '本科及以上学历，物联网、计算机、自动化相关专业',
            '熟悉物联网设备和通信协议',
            '有零售或物流行业技术经验优先',
            '具备数据分析和处理能力',
            '责任心强，具备团队协作精神'
          ],
          benefits: ['五险一金', '双休', '年终奖', '员工购物折扣', '免费班车', '健身房', '技能培训', '节日福利'],
          companyInfo: '京东科技是京东集团全资子公司，致力于为企业、金融机构、政府等客户提供全方位的技术产品与解决方案。'
        }
      },
      {
        id: 8,
        company: '美团科技有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        status: 'available',
        tags: ['苏州', '双休', '青九叔五', '五险一金'],
        deadline: '2025-07-16 14:00',
        type: '',
        isRecommended: false,
        details: {
          location: '苏州市工业园区',
          experience: '2-5年',
          education: '本科及以上',
          positions: '3人',
          description: '负责美团智能配送和智慧零售相关物联网项目的技术实施工作，包括智能设备部署、数据采集系统搭建、配送机器人调试等。',
          requirements: [
            '本科及以上学历，理工科相关专业',
            '熟悉物联网相关技术和协议',
            '具备项目实施和客户沟通经验',
            '有机器人或自动化设备经验者优先',
            '具备较强的现场问题解决能力'
          ],
          benefits: ['五险一金', '双休', '年终奖', '餐饮补贴', '培训机会', '职业发展', '股票期权', '健身房'],
          companyInfo: '美团是中国领先的生活服务电商平台，通过科技连接消费者和商家，提供优质便民的生活服务。美团致力于用科技帮大家吃得更好，生活更好。'
        }
      }
    ],
    internalPositions: [
      {
        id: 1,
        company: '苏州信息科技有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W', 
        interviewTime: '2025-07-16 14:00',
        status: 'scheduled',
        type: 'online',
        statusText: '线上面试等新闻'
      },
      {
        id: 2,
        company: '华为技术有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        interviewTime: '2025-07-16 14:00', 
        status: 'location',
        type: 'offline',
        statusText: '线下面试地点'
      },
      {
        id: 3,
        company: '中兴通讯股份有限公司',
        position: '物联网实施工程师',
        salary: '中阶段/7K-1W',
        interviewTime: '2025-07-16 14:00', 
        status: 'completed',
        type: 'completed',
        statusText: '已面试'
      }
    ],
    jobFlow: {
      steps: [
        { id: 1, name: '内推岗位窗口建链', status: 'completed', color: 'blue' },
        { id: 2, name: '面试交流占高线检', status: 'completed', color: 'green' },
        { id: 3, name: '企业offer发送', status: 'current', color: 'pink' },
        { id: 4, name: '专业技能评分', status: 'pending', color: 'blue' },
        { id: 5, name: '岗位信息流建', status: 'pending', color: 'green' },
        { id: 6, name: '网站简历投递', status: 'pending', color: 'orange' },
        { id: 7, name: '参与企业面试', status: 'pending', color: 'red' }
      ]
    }
  },

  // 用户简历数据
  userResumes: [
    {
      id: 1,
      title: '物联网工程师简历',
      targetPosition: '物联网实施工程师',
      status: 'active',
      statusText: '活跃',
      updateTime: '2024-01-15',
      submitCount: 8,
      type: '技术类',
      skills: ['物联网技术', 'Linux系统', 'TCP/IP', 'MQTT', '嵌入式开发', '项目管理'],
      personalInfo: {
        name: '张同学',
        phone: '138****8888',
        email: 'zhangxue@example.com',
        location: '苏州市'
      },
      education: {
        university: '苏州信息职业技术学院',
        major: '物联网工程',
        degree: '专科',
        graduationYear: '2024'
      },
      experience: '1-2年',
      company: '华为技术有限公司'
    },
    {
      id: 2,
      title: '前端开发工程师简历',
      targetPosition: '前端开发工程师',
      status: 'draft',
      statusText: '草稿',
      updateTime: '2024-01-10',
      submitCount: 3,
      type: '技术类',
      skills: ['React', 'Vue', 'JavaScript', 'TypeScript', 'Node.js', 'Webpack'],
      personalInfo: {
        name: '张同学',
        phone: '138****8888',
        email: 'zhangxue@example.com',
        location: '苏州市'
      },
      education: {
        university: '苏州信息职业技术学院',
        major: '计算机科学与技术',
        degree: '专科',
        graduationYear: '2024'
      },
      experience: '2-3年',
      company: '腾讯科技'
    },
    {
      id: 3,
      title: '数据分析师简历',
      targetPosition: '数据分析师',
      status: 'active',
      statusText: '活跃',
      updateTime: '2024-01-12',
      submitCount: 5,
      type: '分析类',
      skills: ['Python', 'SQL', '数据可视化', 'Excel', '统计分析', 'Tableau'],
      personalInfo: {
        name: '张同学',
        phone: '138****8888',
        email: 'zhangxue@example.com',
        location: '苏州市'
      },
      education: {
        university: '苏州信息职业技术学院',
        major: '数据科学与大数据技术',
        degree: '专科',
        graduationYear: '2024'
      },
      experience: '1-3年',
      company: '阿里巴巴'
    },
    {
      id: 4,
      title: '项目管理简历',
      targetPosition: '项目经理',
      status: 'inactive',
      statusText: '未激活',
      updateTime: '2023-12-20',
      submitCount: 1,
      type: '管理类',
      skills: ['项目管理', 'PMP', '敏捷开发', '团队协作', '风险控制', '需求分析'],
      personalInfo: {
        name: '张同学',
        phone: '138****8888',
        email: 'zhangxue@example.com',
        location: '苏州市'
      },
      education: {
        university: '苏州信息职业技术学院',
        major: '工商管理',
        degree: '专科',
        graduationYear: '2024'
      },
      experience: '3-5年',
      company: '美团'
    }
  ],

  // 我的简历与面试题数据
  resumeInterview: {
    title: '我的简历与面试题',
    industries: [
      {
        id: 'frontend',
        name: '前端开发',
        positions: [
          {
            id: 'react-developer',
            name: 'React开发工程师',
            company: '腾讯科技',
            level: '中级',
            salary: '12-20K',
            experience: '2-4年',
            resume: {
              personalInfo: {
                name: '张三',
                phone: '138****8888',
                email: 'zhangsan@example.com',
                location: '深圳市南山区'
              },
              education: {
                university: '华南理工大学',
                major: '计算机科学与技术',
                degree: '本科',
                graduationYear: '2021'
              },
              experience: [
                {
                  company: '腾讯科技有限公司',
                  position: 'React开发工程师',
                  duration: '2022.03-至今',
                  responsibilities: [
                    '负责QQ音乐Web端核心功能开发，日活用户500万+',
                    '主导前端架构重构，性能提升40%',
                    '建立组件库体系，提升开发效率30%'
                  ]
                }
              ],
              skills: ['React', 'Vue', 'TypeScript', 'Node.js', 'Webpack']
            },
            interviews: {
              hookQuestions: [
                '如何优化React应用的性能？',
                '什么是虚拟DOM？它的优势是什么？',
                'React Hooks相比Class组件有什么优势？',
                '如何处理React组件的状态管理？',
                'React18的新特性有哪些？'
              ],
              allQuestions: [
                {
                  id: 1,
                  category: '技术基础',
                  question: '如何优化React应用的性能？',
                  answer: '1. 使用React.memo避免不必要的重渲染；2. 使用useMemo和useCallback缓存计算结果；3. 代码分割和懒加载；4. 虚拟化长列表；5. 优化bundle大小。'
                }
              ]
            }
          },
          { 
            id: 'vue-developer', 
            name: 'Vue开发工程师', 
            company: '阿里巴巴', 
            level: '高级', 
            salary: '15-25K',
            experience: '3-5年',
            resume: { personalInfo: { name: '李四' } }, 
            interviews: { 
              hookQuestions: ['Vue3相比Vue2有哪些重大改进？', '什么是响应式原理？', '如何进行Vue项目性能优化？', 'Composition API的优势是什么？', 'Pinia与Vuex的区别？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'angular-developer', 
            name: 'Angular开发工程师', 
            company: '华为技术', 
            level: '中级', 
            salary: '12-18K',
            experience: '2-4年',
            resume: { personalInfo: { name: '王五' } }, 
            interviews: { 
              hookQuestions: ['Angular的依赖注入是如何工作的？', '什么是RxJS？', 'Angular的生命周期钩子有哪些？', 'Angular模块系统的设计？', '如何进行Angular单元测试？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'frontend-architect', 
            name: '前端架构师', 
            company: '美团', 
            level: '资深', 
            salary: '25-35K',
            experience: '5-8年',
            resume: { personalInfo: { name: '赵六' } }, 
            interviews: { 
              hookQuestions: ['如何设计一个大型前端应用的架构？', '微前端架构的优缺点是什么？', '如何制定前端技术选型标准？', '前端监控系统如何设计？', '如何处理跨团队协作？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'mobile-developer', 
            name: '移动端开发工程师', 
            company: '小米科技', 
            level: '高级', 
            salary: '18-28K',
            experience: '3-6年',
            resume: { personalInfo: { name: '钱七' } }, 
            interviews: { 
              hookQuestions: ['React Native与原生开发的区别？', '如何优化移动端应用性能？', 'Flutter与React Native如何选择？', '移动端适配方案有哪些？', 'Hybrid开发的优缺点？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'ui-developer', 
            name: 'UI开发工程师', 
            company: '网易', 
            level: '中级', 
            salary: '10-16K',
            experience: '2-4年',
            resume: { personalInfo: { name: '孙八' } }, 
            interviews: { 
              hookQuestions: ['如何实现响应式设计？', 'CSS3动画的最佳实践是什么？', '如何处理浏览器兼容性问题？', 'CSS预处理器的选择？', '组件化开发的思路？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'fullstack-developer', 
            name: '全栈开发工程师', 
            company: '京东', 
            level: '高级', 
            salary: '20-30K',
            experience: '4-7年',
            resume: { personalInfo: { name: '周九' } }, 
            interviews: { 
              hookQuestions: ['全栈开发的技术栈如何选择？', '如何平衡前后端开发时间？', 'DevOps在全栈开发中的作用？', '数据库设计原则？', '系统架构如何演进？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'frontend-lead', 
            name: '前端技术负责人', 
            company: '滴滴出行', 
            level: '专家', 
            salary: '30-50K',
            experience: '6-10年',
            resume: { personalInfo: { name: '吴十' } }, 
            interviews: { 
              hookQuestions: ['如何管理前端团队？', '如何制定前端规范？', '如何处理技术债务？', '人才培养体系建设？', '技术决策的制定流程？'], 
              allQuestions: [] 
            } 
          },
          { 
            id: 'frontend-intern', 
            name: '前端开发实习生', 
            company: '百度', 
            level: '实习', 
            salary: '3-5K',
            experience: '应届生',
            resume: { personalInfo: { name: '郑十一' } }, 
            interviews: { 
              hookQuestions: ['JavaScript基础知识掌握程度？', '如何学习前端技术？', '对前端发展趋势的看法？', '项目经验分享？', '学习规划是什么？'], 
              allQuestions: [] 
            } 
          }
        ]
      },
      {
        id: 'backend',
        name: '后端开发',
        positions: [
          { id: 'java-developer', name: 'Java开发工程师', company: '阿里巴巴', level: '高级', salary: '18-30K', resume: { personalInfo: { name: '陈一' } }, interviews: { hookQuestions: ['Spring Boot的核心特性是什么？', 'JVM调优有哪些关键参数？', '如何设计高并发系统？'], allQuestions: [] } },
          { id: 'python-developer', name: 'Python开发工程师', company: '字节跳动', level: '中级', salary: '12-20K', resume: { personalInfo: { name: '林二' } }, interviews: { hookQuestions: ['Django与Flask的区别？', 'Python的GIL是什么？', '如何优化Python程序性能？'], allQuestions: [] } },
          { id: 'golang-developer', name: 'Go开发工程师', company: '腾讯', level: '高级', salary: '20-35K', resume: { personalInfo: { name: '黄三' } }, interviews: { hookQuestions: ['Go语言的并发模型是什么？', 'Go的垃圾回收机制？', '如何进行Go程序调优？'], allQuestions: [] } },
          { id: 'nodejs-developer', name: 'Node.js开发工程师', company: '美团', level: '中级', salary: '14-22K', resume: { personalInfo: { name: '何四' } }, interviews: { hookQuestions: ['Node.js的事件循环机制？', '如何处理Node.js内存泄漏？', 'Express与Koa的区别？'], allQuestions: [] } },
          { id: 'php-developer', name: 'PHP开发工程师', company: '新浪', level: '中级', salary: '10-18K', resume: { personalInfo: { name: '罗五' } }, interviews: { hookQuestions: ['PHP8的新特性有哪些？', 'Laravel框架的核心概念？', '如何优化PHP应用性能？'], allQuestions: [] } },
          { id: 'microservice-architect', name: '微服务架构师', company: '华为', level: '专家', salary: '35-60K', resume: { personalInfo: { name: '高六' } }, interviews: { hookQuestions: ['微服务拆分的原则是什么？', '如何处理分布式事务？', '服务网格的作用是什么？'], allQuestions: [] } },
          { id: 'devops-engineer', name: 'DevOps工程师', company: '小米', level: '高级', salary: '18-32K', resume: { personalInfo: { name: '梁七' } }, interviews: { hookQuestions: ['CI/CD流水线如何设计？', 'Docker与Kubernetes的关系？', '如何实现灰度发布？'], allQuestions: [] } },
          { id: 'database-engineer', name: '数据库工程师', company: '蚂蚁金服', level: '专家', salary: '30-50K', resume: { personalInfo: { name: '韩八' } }, interviews: { hookQuestions: ['MySQL索引优化策略？', '分库分表如何设计？', 'Redis与MySQL的使用场景？'], allQuestions: [] } },
          { id: 'backend-intern', name: '后端开发实习生', company: '网易', level: '实习', salary: '3-6K', resume: { personalInfo: { name: '冯九' } }, interviews: { hookQuestions: ['计算机网络基础知识？', '数据结构与算法掌握程度？', '对后端技术栈的理解？'], allQuestions: [] } }
        ]
      },
      {
        id: 'data-analysis',
        name: '数据分析',
        positions: [
          { id: 'data-analyst', name: '数据分析师', company: '阿里巴巴', level: '高级', salary: '15-25K', resume: { personalInfo: { name: '陈数据' } }, interviews: { hookQuestions: ['SQL优化的常用技巧？', '如何进行用户行为分析？', 'A/B测试的设计原则？'], allQuestions: [] } },
          { id: 'data-scientist', name: '数据科学家', company: '腾讯', level: '专家', salary: '30-50K', resume: { personalInfo: { name: '李科学' } }, interviews: { hookQuestions: ['机器学习算法如何选择？', '特征工程的最佳实践？', '如何评估模型效果？'], allQuestions: [] } },
          { id: 'ml-engineer', name: '机器学习工程师', company: '百度', level: '高级', salary: '20-35K', resume: { personalInfo: { name: '王学习' } }, interviews: { hookQuestions: ['深度学习框架比较？', '模型部署的挑战？', '如何处理数据倾斜？'], allQuestions: [] } },
          { id: 'bi-analyst', name: 'BI分析师', company: '美团', level: '中级', salary: '12-20K', resume: { personalInfo: { name: '赵商业' } }, interviews: { hookQuestions: ['数据仓库建模方法？', 'ETL流程设计原则？', '可视化工具选择？'], allQuestions: [] } },
          { id: 'data-engineer', name: '数据工程师', company: '字节跳动', level: '高级', salary: '18-30K', resume: { personalInfo: { name: '钱工程' } }, interviews: { hookQuestions: ['大数据处理架构设计？', 'Spark与Hadoop的区别？', '实时数据处理方案？'], allQuestions: [] } },
          { id: 'algorithm-engineer', name: '算法工程师', company: '华为', level: '专家', salary: '25-45K', resume: { personalInfo: { name: '孙算法' } }, interviews: { hookQuestions: ['推荐算法的演进？', '深度学习在推荐中的应用？', '算法效果如何评估？'], allQuestions: [] } },
          { id: 'quant-analyst', name: '量化分析师', company: '招商证券', level: '高级', salary: '25-40K', resume: { personalInfo: { name: '周量化' } }, interviews: { hookQuestions: ['量化交易策略设计？', '风险管理模型？', '因子挖掘方法？'], allQuestions: [] } },
          { id: 'research-scientist', name: '研究科学家', company: '微软亚洲研究院', level: '专家', salary: '35-60K', resume: { personalInfo: { name: '吴研究' } }, interviews: { hookQuestions: ['前沿技术研究方向？', '学术成果转化？', '研究方法论？'], allQuestions: [] } },
          { id: 'data-intern', name: '数据分析实习生', company: '京东', level: '实习', salary: '3-5K', resume: { personalInfo: { name: '郑实习' } }, interviews: { hookQuestions: ['统计学基础知识？', 'Python数据分析库？', '数据可视化经验？'], allQuestions: [] } }
        ]
      },
      {
        id: 'product-design',
        name: '产品设计',
        positions: [
          { id: 'product-manager', name: '产品经理', company: '腾讯', level: '高级', salary: '20-35K', resume: { personalInfo: { name: '陈产品' } }, interviews: { hookQuestions: ['如何进行需求分析？', '产品规划方法论？', '用户体验设计原则？'], allQuestions: [] } },
          { id: 'ui-designer', name: 'UI设计师', company: '字节跳动', level: '中级', salary: '12-22K', resume: { personalInfo: { name: '李设计' } }, interviews: { hookQuestions: ['设计系统如何建立？', '色彩搭配原理？', '移动端设计规范？'], allQuestions: [] } },
          { id: 'ux-designer', name: 'UX设计师', company: '阿里巴巴', level: '高级', salary: '18-30K', resume: { personalInfo: { name: '王体验' } }, interviews: { hookQuestions: ['用户研究方法？', '交互设计原则？', '可用性测试流程？'], allQuestions: [] } },
          { id: 'product-designer', name: '产品设计师', company: '美团', level: '高级', salary: '16-28K', resume: { personalInfo: { name: '赵全能' } }, interviews: { hookQuestions: ['设计思维流程？', '跨平台设计一致性？', '设计与开发协作？'], allQuestions: [] } },
          { id: 'interaction-designer', name: '交互设计师', company: '网易', level: '中级', salary: '14-24K', resume: { personalInfo: { name: '钱交互' } }, interviews: { hookQuestions: ['交互原型工具比较？', '手势交互设计？', '无障碍设计考虑？'], allQuestions: [] } },
          { id: 'visual-designer', name: '视觉设计师', company: '小米', level: '中级', salary: '10-18K', resume: { personalInfo: { name: '孙视觉' } }, interviews: { hookQuestions: ['品牌视觉一致性？', '图标设计规范？', '视觉层次构建？'], allQuestions: [] } },
          { id: 'design-director', name: '设计总监', company: '华为', level: '专家', salary: '35-60K', resume: { personalInfo: { name: '周总监' } }, interviews: { hookQuestions: ['设计团队管理？', '设计质量控制？', '设计文化建设？'], allQuestions: [] } },
          { id: 'motion-designer', name: '动效设计师', company: '蚂蚁金服', level: '高级', salary: '15-26K', resume: { personalInfo: { name: '吴动效' } }, interviews: { hookQuestions: ['动效设计原则？', '性能与美观平衡？', '动效实现技术？'], allQuestions: [] } },
          { id: 'design-intern', name: '设计实习生', company: '滴滴', level: '实习', salary: '3-5K', resume: { personalInfo: { name: '郑新人' } }, interviews: { hookQuestions: ['设计基础理论？', '软件工具掌握？', '作品集展示？'], allQuestions: [] } }
        ]
      },
      {
        id: 'project-management',
        name: '项目管理',
        positions: [
          { id: 'project-manager', name: '项目经理', company: '华为', level: '高级', salary: '18-30K', resume: { personalInfo: { name: '陈项目' } }, interviews: { hookQuestions: ['项目管理方法论？', '风险管理策略？', '团队沟通技巧？'], allQuestions: [] } },
          { id: 'scrum-master', name: 'Scrum Master', company: '阿里巴巴', level: '中级', salary: '15-25K', resume: { personalInfo: { name: '李敏捷' } }, interviews: { hookQuestions: ['Scrum框架实践？', '敏捷转型挑战？', '团队效能提升？'], allQuestions: [] } },
          { id: 'pmo', name: 'PMO专员', company: '腾讯', level: '中级', salary: '12-20K', resume: { personalInfo: { name: '王规范' } }, interviews: { hookQuestions: ['PMO职能定位？', '项目治理体系？', '流程标准化？'], allQuestions: [] } },
          { id: 'program-manager', name: '项目群经理', company: '字节跳动', level: '专家', salary: '28-45K', resume: { personalInfo: { name: '赵项目群' } }, interviews: { hookQuestions: ['多项目协调？', '资源优化配置？', '战略目标分解？'], allQuestions: [] } },
          { id: 'business-analyst', name: '业务分析师', company: '美团', level: '高级', salary: '16-28K', resume: { personalInfo: { name: '钱分析' } }, interviews: { hookQuestions: ['需求分析方法？', '业务流程梳理？', '干系人管理？'], allQuestions: [] } },
          { id: 'delivery-manager', name: '交付经理', company: '百度', level: '高级', salary: '20-32K', resume: { personalInfo: { name: '孙交付' } }, interviews: { hookQuestions: ['交付质量保证？', '客户满意度管理？', '交付流程优化？'], allQuestions: [] } },
          { id: 'change-manager', name: '变更管理专员', company: 'IBM', level: '中级', salary: '14-22K', resume: { personalInfo: { name: '周变更' } }, interviews: { hookQuestions: ['变更管理流程？', '组织变革策略？', '变更阻力应对？'], allQuestions: [] } },
          { id: 'agile-coach', name: '敏捷教练', company: '微软', level: '专家', salary: '30-50K', resume: { personalInfo: { name: '吴教练' } }, interviews: { hookQuestions: ['敏捷文化建设？', '团队辅导方法？', '持续改进机制？'], allQuestions: [] } },
          { id: 'pm-intern', name: '项目管理实习生', company: '京东', level: '实习', salary: '3-5K', resume: { personalInfo: { name: '郑学习者' } }, interviews: { hookQuestions: ['项目管理基础？', '沟通协调能力？', '学习成长规划？'], allQuestions: [] } }
        ]
      }
    ]
  },

  // 我的项目库数据
  projectLibrary: {
    title: '我的项目库',
    searchPlaceholder: '搜索',
    projects: [
      {
        id: 1,
        title: '长安汽车车机测试项目案例',
        subtitle: '物联网业务管理课程',
        tags: ['物联网', '车机测试', '项目管理'],
        details: {
          overview: '本项目旨在为长安汽车设计并实施一套完整的车机测试系统，通过物联网技术实现对车载设备的远程监控和管理。项目涵盖了从需求分析到系统部署的完整开发流程，采用微服务架构和云原生技术，确保系统的高可用性和可扩展性。项目团队运用敏捷开发方法，在6个月内成功交付了符合客户要求的产品。',
          teamConfig: [
            { role: '项目经理', name: 'XXXXXXXXX' },
            { role: '技术经理', name: 'XXXXXXXXX' },
            { role: '前端开发', name: 'XXXXXXXXX' },
            { role: '后端开发', name: 'XXXXXXXXX' },
            { role: '测试工程师', name: 'XXXXXXXXX' },
            { role: '运维工程师', name: 'XXXXXXXXX' }
          ],
          dataInterface: [
            { label: '服务器', value: 'XXXXXXXXX' },
            { label: '中间件', value: 'XXXXXXXXX' },
            { label: '数据库', value: 'XXXXXXXXX' }
          ],
          businessFlow: [
            { title: '需求分析', description: '深入分析客户需求，确定项目范围和技术方案。与客户进行多轮沟通，明确功能需求和性能指标，形成详细的需求文档和技术架构设计。' },
            { title: '系统设计', description: '设计系统架构和数据库结构，制定开发计划。采用微服务架构，确保系统的模块化和可扩展性，同时制定详细的接口规范。' },
            { title: 'XXXXXXXXX', description: 'XXXXXXXXXXXXXXXXXX' },
            { title: 'XXXXXXXXX', description: 'XXXXXXXXXXXXXXXXXX' }
          ],
          keyTechnologies: [
            '基于微服务架构的系统设计，XXXXXXXXXXXXXXXXXX',
            'XXXXXXXXXXXXX，XXXXXXXXXXXXXXXXXX',
            'XXXXXXXXX，XXXXXXXXXXXXXXXXXX',
            'XXXXXXXXX，XXXXXXXXXXXXXXXXXX'
          ],
          attachments: [
            { name: '车机测试报告.pdf', type: 'pdf', size: '2.5MB', url: '/files/report.pdf' },
            { name: '项目需求文档.docx', type: 'word', size: '1.8MB', url: '/files/requirements.docx' },
            { name: '系统架构图.pptx', type: 'ppt', size: '3.2MB', url: '/files/architecture.pptx' },
            { name: '测试数据分析.xlsx', type: 'excel', size: '4.1MB', url: '/files/analysis.xlsx' }
          ]
        }
      },
      ...Array.from({length: 17}, (_, i) => ({
        id: i + 2,
        title: `长安汽车车机测试项目案例`,
        subtitle: `物联网业务管理课程`,
        tags: ['物联网', '车机测试', '项目管理'],
        details: {
          overview: '项目概述数据加载中...',
          teamConfig: [],
          dataInterface: [],
          businessFlow: [],
          keyTechnologies: [],
          attachments: []
        }
      }))
    ]
  },

  // 1V1求职策略直播数据
  jobStrategyLive: {
    courseId: 'job-strategy-001',
    title: '1V1定制求职策略直播指导',
    teacher: '求职指导专家 - 王老师',
    teacherAvatar: '/api/placeholder/48/48',
    startTime: new Date().toISOString(),
    viewers: 1,
    description: '专业求职指导老师一对一直播连线，根据你的专业背景和就业意向，个性化制定求职策略，提供简历优化、面试技巧、薪资谈判等全方位指导。',
    status: 'live',
    duration: '60分钟'
  },

  // 求职策略直播纪要
  jobStrategyNotes: {
    title: '直播纪要',
    keyPoints: [
      {
        id: 1,
        time: '14:05',
        type: 'strategy',
        title: '个人定位分析',
        content: '基于你的专业背景（数据科学与大数据技术），建议重点关注数据分析师、算法工程师等岗位'
      },
      {
        id: 2,
        time: '14:12',
        type: 'advice',
        title: '简历优化建议',
        content: '突出项目经验，量化工作成果，技能部分按重要性排序。删除无关经历，确保简历针对性强'
      },
      {
        id: 3,
        time: '14:20',
        type: 'timeline',
        title: '求职时间规划',
        content: '第1-2周完成简历优化，第3-4周投递简历，第5-6周准备面试，预计6-8周内获得offer'
      },
      {
        id: 4,
        time: '14:28',
        type: 'action',
        title: '本周行动项',
        content: '完成简历修改、准备3个项目案例介绍、练习自我介绍（控制在2分钟内）'
      }
    ],
    expertAdvices: [
      '投递简历要有针对性，不要海投',
      '面试前要研究目标公司的业务和文化',
      '准备STAR法则回答行为面试问题',
      '薪资谈判时要基于市场调研数据'
    ],
    personalPlan: {
      targetRole: '数据分析师',
      targetSalary: '8K-12K',
      targetCompanies: ['字节跳动', '阿里巴巴', '腾讯', '美团'],
      strengthAreas: ['Python编程', '数据可视化', '机器学习'],
      improvementAreas: ['SQL优化', '业务理解', '沟通表达']
    },
    upcomingActions: [
      {
        id: 1,
        task: '完成简历第二版修改',
        deadline: '本周五',
        priority: 'high',
        status: 'pending'
      },
      {
        id: 2,
        task: '准备3个项目案例详细介绍',
        deadline: '下周二',
        priority: 'high',
        status: 'pending'
      },
      {
        id: 3,
        task: '练习2分钟自我介绍',
        deadline: '本周日',
        priority: 'medium',
        status: 'pending'
      },
      {
        id: 4,
        task: '调研目标公司岗位要求',
        deadline: '下周五',
        priority: 'medium',
        status: 'pending'
      }
    ]
  }
};

// 获取指定日期的事项
export const getEventsForDate = (year, month, date) => {
  console.log('查找日期事项:', { year, month, date });
  
  // 格式化日期字符串 (YYYY-MM-DD)
  const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
  
  // 从 calendarEvents 中筛选匹配的事项
  const matchingEvents = mockData.calendarEvents.filter(event => {
    const eventDate = event.startTime.split(' ')[0];
    return eventDate === dateString;
  });
  
  console.log('找到事项:', { dateString, count: matchingEvents.length, events: matchingEvents });
  
  return matchingEvents;
};

// 生成日历数据的辅助函数
export const generateCalendarDays = (calendarEvents = [], targetDate = new Date(), enhancedTasks = []) => {
  const days = [];
  const today = new Date();
  const currentMonth = targetDate.getMonth();
  const currentYear = targetDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // 添加前一个月的日期（灰色显示）
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth, -i);
    days.push({
      date: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }

  // 添加当前月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today.getDate() && 
                   currentMonth === today.getMonth() && 
                   currentYear === today.getFullYear();
    
    // 检查是否有日历事件
    const hasCalendarEvent = calendarEvents.some(event => {
      const eventDate = event.startTime.split(' ')[0];
      return eventDate === `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    });

    // 检查是否有任务事项
    const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const hasTask = enhancedTasks.some(task => task.date === dateString);

    days.push({
      date: day,
      isCurrentMonth: true,
      isToday,
      hasEvent: hasCalendarEvent || hasTask
    });
  }

  // 添加下个月的日期（完整显示42天）
  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let day = 1; day <= remainingCells; day++) {
    days.push({
      date: day,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }

  return days;
};

// 日历工具函数
export const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // 添加上个月的末尾几天
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDay - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // 添加当前月的天数
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = today.getFullYear() === year && 
                   today.getMonth() === month && 
                   today.getDate() === day;
    
    days.push({
      date: day,
      month: month,
      year: year,
      isCurrentMonth: true,
      isToday
    });
  }
  
  // 补齐到42天（6周）
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remainingDays = 42 - days.length;
  
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: day,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  return days;
};

// 获取周的日期
export const getWeekDays = (date) => {
  const week = [];
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);
  
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);
    week.push(weekDay);
  }
  
  return week;
};

// 时间驱动的进度计算工具函数
export const calculateStageProgress = (stage, currentDate = new Date()) => {
  const startDate = new Date(stage.startDate);
  const endDate = new Date(stage.endDate);
  const current = new Date(currentDate);

  // 如果当前日期在阶段开始之前，进度为0%
  if (current < startDate) {
    return 0;
  }
  
  // 如果当前日期在阶段结束之后，进度为100%
  if (current >= endDate) {
    return 100;
  }

  // 计算当前阶段的进度百分比
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = current.getTime() - startDate.getTime();
  const progressPercentage = (elapsedDuration / totalDuration) * 100;

  // 限制在0%到100%之间
  return Math.max(0, Math.min(100, Math.round(progressPercentage * 100) / 100));
};

// 获取当前活跃阶段
export const getCurrentActiveStage = (stages, currentDate = new Date()) => {
  const current = new Date(currentDate);
  
  for (const stage of stages) {
    const startDate = new Date(stage.startDate);
    const endDate = new Date(stage.endDate);
    
    if (current >= startDate && current < endDate) {
      return stage;
    }
  }
  
  return null;
};

// 检查里程碑是否阻塞阶段切换
export const checkMilestoneBlockage = (stages, milestones, currentDate = new Date()) => {
  const current = new Date(currentDate);
  
  for (const stage of stages) {
    const endDate = new Date(stage.endDate);
    
    // 如果阶段时间已结束但状态不是completed
    if (current >= endDate && stage.status !== 'completed') {
      // 检查是否有前置里程碑要求
      if (stage.prerequisiteMilestone) {
        const milestone = milestones.find(m => m.id === stage.prerequisiteMilestone);
        if (milestone && milestone.status !== 'completed') {
          return {
            isBlocked: true,
            blockingMilestone: milestone,
            stalledStage: stage,
            message: `需要完成"${milestone.name}"才能进入下一阶段`
          };
        }
      }
    }
  }
  
  return { isBlocked: false };
};

// 动态更新学习阶段状态
export const updateStageStatuses = (learningPlan, currentDate = new Date()) => {
  const { learningStages, milestones } = learningPlan;
  const current = new Date(currentDate);
  
  const updatedStages = learningStages.map(stage => {
    const startDate = new Date(stage.startDate);
    const endDate = new Date(stage.endDate);
    
    let newStatus = stage.status;
    let newProgressPercentage = calculateStageProgress(stage, currentDate);
    
    // 更新状态逻辑
    if (current < startDate) {
      newStatus = 'locked';
      newProgressPercentage = 0;
    } else if (current >= endDate) {
      // 检查是否有里程碑阻塞
      if (stage.prerequisiteMilestone) {
        const milestone = milestones.find(m => m.id === stage.prerequisiteMilestone);
        if (milestone && milestone.status !== 'completed') {
          newStatus = 'stalled'; // 停滞状态
          newProgressPercentage = 100; // 时间完成但被阻塞
        } else {
          newStatus = 'completed';
          newProgressPercentage = 100;
        }
      } else {
        newStatus = 'completed';
        newProgressPercentage = 100;
      }
    } else {
      newStatus = 'in_progress';
      newProgressPercentage = calculateStageProgress(stage, currentDate);
    }
    
    return {
      ...stage,
      status: newStatus,
      progressPercentage: newProgressPercentage
    };
  });
  
  return updatedStages;
};

// 获取整体学习进度（用于原有的进度条显示）
export const getOverallProgress = (stages) => {
  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);
  let completedDuration = 0;
  
  for (const stage of stages) {
    if (stage.status === 'completed') {
      completedDuration += stage.duration;
    } else if (stage.status === 'in_progress') {
      completedDuration += (stage.duration * stage.progressPercentage) / 100;
      break; // 当前阶段之后的不计算
    } else {
      break; // 未开始的阶段不计算
    }
  }
  
  return (completedDuration / totalDuration) * 100;
};

// 模拟数据加载完成 