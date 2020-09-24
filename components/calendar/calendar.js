// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedDate:'',   //选中的几月几号
    selectedWeek:'',   //选中的是星期几
    curYear:2017,   //当前年份
    curMonth:0,   //当前月份
    daysCountArr:[31,28,31,30,31,30,31,31,30,31,30,31],
    weekArr:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dateList:[]
  },

  lifetimes:{
    attached(){
      var today=new Date();
      var curYear=today.getFullYear();
      var curMonth=today.getMonth()+1;
      var d=today.getDate();
      var i=today.getDay();
      var selectedDate=curYear+'-'+curMonth+'-'+d;
      var selectedWeek=this.data.weekArr[i];
      this.setData({
        curYear,
        curMonth,
        selectedDate,
        selectedWeek
      })
      this.getDateList(curYear,curMonth-1);
      this.triggerEvent('timeload',{selectedDate,selectedWeek})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDateList(y,mon){
      var vm=this;
      var daysCountArr=this.data.daysCountArr;
      if(y%4===0 && y%100!=0){
        this.data.daysCountArr[1]=29;
        this.setData({
          daysCountArr
        })
      }
      var dateList=[]
      dateList[0]=[]
      var weekIndex=0;
      for(var i=0;i<vm.data.daysCountArr[mon];i++){
        var week=new Date(Date.UTC(y,mon,i+1)).getDay();
        dateList[weekIndex].push({
          value:y+'-'+(mon+1)+'-'+(i+1),
          date:i+1,
          week:week
        });
        if(week==6){
          weekIndex++;
          dateList[weekIndex]=[]
        }
      }
      vm.setData({
        dateList
      })
      
    },
    selectDate(e){
      var vm=this;
      vm.setData({
        selectedDate:e.currentTarget.dataset.date.value,
        selectedWeek:vm.data.weekArr[e.currentTarget.dataset.date.week]
      })
      this.triggerEvent('timechanged',{
        selectedDate:e.currentTarget.dataset.date.value,
        selectedWeek:vm.data.weekArr[e.currentTarget.dataset.date.week]
      })
    },
    preMonth(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear=curMonth-1?curYear:curYear-1;
      curMonth=curMonth-1?curMonth-1:12;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1);
    },
    nextMonth(){
      var vm=this;
      var curYear=vm.data.curYear;
      var curMonth=vm.data.curMonth;
      curYear=curMonth+1==13?curYear+1:curYear;
      curMonth=curMonth+1==13?1:curMonth+1;
      vm.setData({
        curYear,
        curMonth
      });
      vm.getDateList(curYear,curMonth-1);
    }
  }
})
