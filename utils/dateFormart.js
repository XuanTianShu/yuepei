
 

export function dateFormart(date){
				//年 getFullYear()：四位数字返回年份
				var year = date.getFullYear();  //getFullYear()代替getYear()
				//月 getMonth()：0 ~ 11
				var month = date.getMonth() + 1;
				//日 getDate()：(1 ~ 31)
				var day = date.getDate();
				//时 getHours()：(0 ~ 23)
				var hour = date.getHours();
				//分 getMinutes()： (0 ~ 59)
				var minute = date.getMinutes();
				//秒 getSeconds()：(0 ~ 59)
				var second = date.getSeconds();
				
				if(hour/10<1) hour='0'+hour
				if(minute/10<1) minute='0'+minute
				if(second/10<1) second='0'+second
				var time = year + '-' + month + '-' + day + '  ' + hour + ':' + minute+':'+second
				
				return time
}



		
export function toNumber(rule){
							 let arr=[]
							 arr=rule.startTime.split(':')
							 rule.startTime=arr[0]*1+arr[1]/60
							 
							 arr=rule.endTime.split(':')
							 rule.endTime=arr[0]*1+arr[1]/60
		
							 rule.price=parseFloat(rule.price)
							 return rule 
}			

// 计费
export function count(start,r1,r2,sum,times){
	
		let lang=r2.endTime-r2.startTime 
	
		if(r2.startTime>=r2.endTime){// 套餐第二天结束
			
			lang=24-r2.startTime+r2.endTime //套餐时长
			
			if(start>=r2.startTime){
				//套餐起步
				sum+=r2.price
				lang=lang-(start-r2.startTime)//套餐剩余时长
				if(times<=lang) return sum
				times-=lang
			 	return count(r2.endTime,r1,r2,sum,times)
				
			}else{
				if(start>=r2.endTime){//计时起步
				
					lang=r2.startTime-start//计时时长
					
					if(times<=lang){
						let s= Math.trunc(times)
						if(times-s>0) s++
						sum+=s*r1.price
						return sum
						
					}else{
						times-=lang
						let s= Math.trunc(lang)
						if((lang-s)>0) s++
						sum+=s*r1.price
						return count(r2.startTime,r1,r2,sum,times)
					}
				}else{
					sum+=r2.price
					lang=r2.endTime-start
					if(times<=lang)return sum
					return count(r2.endTime,r1,r2,sum,times)
				}
				
			}
		}else{
			if(start>=r2.startTime && start<=r2.endTime){//套餐期间
			
				sum+=r2.price
				lang=r2.endTime-start
				if(times<=lang) return sum
				
				times-=lang
				// 加两秒
				return count(r2.endTime+(2/360),r1,r2,sum,times)
				
			}else{//计时期间  
				if(start<r2.startTime) lang=r2.startTime-start
				if(start>r2.endTime) lang=24-start+r2.startTime
				if(times<=lang){
					let s= Math.trunc(times)
					if((times-s)>0) s++
					sum+=s*r1.price
					return sum
					
				}else{
					let s= Math.trunc(lang)
					if((lang-s)>0) s++
					times-=lang
					sum+=s*r1.price
					
					return count(r2.startTime,r1,r2,sum,times)
					
				}
			}
		}
		
}			
export function sumPrice(start,rl,times){ //开始时间，套餐规则rule，0，总用时
			let s= Math.trunc(times)
			
			let [a,b]=JSON.parse(rl)//去索引
			a=toNumber(a)
			b=toNumber(b)
			let sum=0
			// --------
			if((times-s)*60>10) {
				start=start.getHours()+start.getMinutes()/60
				sum=count(start,a,b,0,times)
			}
			// --------
			let res={
				sum:sum,
				rlb:b
			}	
			
			return res
}
