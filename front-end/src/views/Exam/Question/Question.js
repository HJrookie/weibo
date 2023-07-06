import React from 'react';
import './Question.less'
import {Button, Checkbox, Icon, Input, Radio, Tag} from 'antd';
import propTypes from 'prop-types'
import utils from "src/Utils/Utils";


export default class Question extends React.Component {
	static propTypes={
		type:propTypes.string.isRequired,
		DataSource:propTypes.array.isRequired,

	}
	static defaultProps={
		type:"answer",
		DataSource:[],

	}
	constructor(props){
		super(props);
		this.state={
			questions:props.DataSource,
			questionTypeList: {
				"1": "单选题",
				"2": "多选题",
				"3": "判断题",
				"4": "简答题",
				"5":"技能题"
			},
			questionColor: {
				"1": "blue",
				"2": "cyan",
				"3": "green",
				"4": "red",
				"5": "orange"
			},
			type:props.type,
			currentIndex:null,
			disabled:props.type==="preview",
			role:localStorage.getItem("role")
		}
	}
	componentDidMount() {

	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props!==nextProps){
			this.setState({
				type:nextProps.type,
				questions:nextProps.DataSource
			})
			this.setState({
				currentIndex:nextProps.queIndex
			},()=>{
				const target = document.querySelector(`#id${this.state.currentIndex}`)
				target?target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				}):false
			})

		}

	}


	questionAnswerType=(item,answer)=>{
		const options = ["A", "B", "C", "D", "E", "F", "G", "H"]
		if (item.type ===2||item.type ===1) {
			return <ul className="options">
				{
					options.map((val, index) => {
						return item[`option${val}`] !== null &&
							<li className="options_item" key={index} onClick={()=>this.props.setUpChoose(item.type,item.id,val)}>
								{
									//checked={item.answer?item.answer.IndexOf(val):false}
									item.type===1
										?
										<Radio checked={answer?answer.indexOf(val)!==-1:false}/>
										:
										<Checkbox  checked={answer?answer.indexOf(val)!==-1:false}/>
								}
								<span className="label">{val}.</span>
								{item[`option${val}`]}
							</li>
					})
				}
			</ul>
		}else if(item.type ===3){
			return <div>
				<Button onClick={()=>this.props.setUpChoose(item.type,item.id,"Y")} type={answer==="Y"?"primary":"default"}>正确</Button>
				<Button style={{marginLeft:20}} onClick={()=>this.props.setUpChoose(item.type,item.id,"N")} type={answer==="N"?"primary":"default"}>错误</Button>
			</div>
		 }//else if(item.type ===4){
		// 	return <Input.TextArea
		// 		value={item.answer}
		// 		placeholder="请输入你的答案"
		// 		autosize={{minRows:2,maxRows:4}}
		// 		onChange={(e)=>this.props.setUpChoose(item.type,item.id,e.target.value)}
		// 	/>
		// }
	}
	render() {
		const {questionColor,questionTypeList,questions,type,disabled}=this.state
		return <div id="com-question">
			{
				questions.map((item, index) => {
					return (
						<div id={`id${index}`} key={index} className={`question ${this.state.currentIndex===index?"selectedQue":""}`}>
							<span className={`question_number ${this.state.currentIndex===index?"selected":""}`}>{index + 1}.</span>
							<p className="stem">
									<Tag color={questionColor[item.type]}>{questionTypeList[item.type]}</Tag>
									<Tag color="#2db7f5">{ `${item.point}分`}</Tag>
									{item.stem}
							</p>
							{
								item.list.length > 0 && item.list.map((item, index) => {
									return <div key={index} style={{textAlign: "center",marginBottom:20}}>
										<img style={{maxWidth: 500}} src={item.path} alt=""/>
									</div>
								})
							}
							<div className="question_main">
								<div className="inner">
									{
										this.questionAnswerType(item,type==="answer"?item.answer:item.examPaperAnswerVO.answer)
									}
									{
										this.state.type!=="answer"&&
											<div>
												{
													item.examPaperAnswerVO&&
													<div className="student_answer">
														{this.state.role==="S"?"我的答案":"学生答案"}：
														{
															item.examPaperAnswerVO.answer
														}
													</div>
												}
												<div className="right_answer">正确答案：{
													item.type===3
														?
														item.answer==="N"?"错误":"正确"
														:
														item.answer
												}</div>
												{
													item.analysis&&
													<div className="analyse">
														解析：{item.analysis}
													</div>
												}
												{
													item.type===4&&
													<div className="question-score">
														<span className="title">老师评分：</span>
														<Input
															disabled={disabled}
															onChange={(e)=>this.props.setUpChoose("score",item.id,utils.numRules(e.target.value,0,item.point))}
															value={item.examPaperAnswerVO.score}
															style={{width:80}} placeholder="输入得分"/>
													</div>
												}

												<div className="teacher-comment">
													<span className="title">老师点评：</span>
													<Input
														disabled={disabled}
														onChange={(e)=>this.props.setUpChoose("teacherComment",item.id,e.target.value)}
														value={item.examPaperAnswerVO.teacherComment}
														// defaultValue={item.answer===item.examPaperAnswer.answer?"棒棒哒！加油！":"知识点掌握不牢固，下次努力！加油！"}
													/>
												</div>
											</div>
									}
								</div>

							</div>
						</div>
					)
				})
			}
		</div>
	}
}

