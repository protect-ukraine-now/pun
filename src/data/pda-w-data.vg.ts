export default
{
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"autosize": {
		"type": "fit",
		"contains": "padding"
	},
	"background": "white",
	"padding": 5,
	"style": "cell",
	"data": [
		{
			"name": "pda",
			"format": {
				"type": "csv",
				"parse": {
					"week": "date",
					"PDA": "number"
				}
			},
			"transform": [
				{
					"type": "formula",
					"expr": "datum.PDA / 1000",
					"as": "PDA"
				},
				{
					"field": "week",
					"type": "timeunit",
					"units": [
						"year",
						"month"
					],
					"as": [
						"label",
						"label_end"
					]
				},
				{
					"type": "aggregate",
					"groupby": [
						"label"
					],
					"ops": [
						"sum"
					],
					"fields": [
						"PDA"
					],
					"as": [
						"amount"
					]
				},
				{
					"type": "filter",
					"expr": "datum.amount != 0"
				},
				{
					"type": "window",
					"params": [
						null
					],
					"as": [
						"sum"
					],
					"ops": [
						"sum"
					],
					"fields": [
						"amount"
					],
					"sort": {
						"field": [],
						"order": []
					}
				},
				{
					"type": "window",
					"params": [
						null
					],
					"as": [
						"lead"
					],
					"ops": [
						"lead"
					],
					"fields": [
						"label"
					],
					"sort": {
						"field": [],
						"order": []
					}
				},
				{
					"type": "formula",
					"expr": "datum.lead === null ? datum.label : datum.lead",
					"as": "lead"
				},
				{
					"type": "formula",
					"expr": "datum.label === 'End' ? 0 : datum.sum - datum.amount",
					"as": "previous_sum"
				},
				{
					"type": "formula",
					"expr": "datum.label === 'End' ? datum.sum : datum.amount",
					"as": "amount"
				},
				{
					"type": "formula",
					"expr": "join(['$', format(datum.amount, '.2f'), 'B'], '')",
					"as": "text_amount"
				},
				{
					"type": "formula",
					"expr": "(datum.sum + datum.previous_sum) / 2",
					"as": "center"
				},
				{
					"type": "formula",
					"expr": "datum.sum < datum.previous_sum ? datum.sum : ''",
					"as": "sum_dec"
				},
				{
					"type": "formula",
					"expr": "datum.sum > datum.previous_sum ? datum.sum : ''",
					"as": "sum_inc"
				}
			],
			"values": "week,PDA\r\n2022-02-26,350\r\n2022-03-05,\r\n2022-03-12,200\r\n2022-03-19,800\r\n2022-03-26,\r\n2022-04-02,\r\n2022-04-09,100\r\n2022-04-16,800\r\n2022-04-23,800\r\n2022-04-30,\r\n2022-05-07,150\r\n2022-05-14,\r\n2022-05-21,100\r\n2022-05-28,\r\n2022-06-04,700\r\n2022-06-11,\r\n2022-06-18,350\r\n2022-06-25,450\r\n2022-07-02,50\r\n2022-07-09,400\r\n2022-07-16,\r\n2022-07-23,175\r\n2022-07-30,\r\n2022-08-06,550\r\n2022-08-13,1000\r\n2022-08-20,775\r\n2022-08-27,\r\n2022-09-03,\r\n2022-09-10,675\r\n2022-09-17,600\r\n2022-09-24,\r\n2022-10-01,\r\n2022-10-08,625\r\n2022-10-15,725\r\n2022-10-22,\r\n2022-10-29,275\r\n2022-11-05,\r\n2022-11-12,400\r\n2022-11-19,\r\n2022-11-26,400\r\n2022-12-03,\r\n2022-12-10,275\r\n2022-12-17,\r\n2022-12-24,1000\r\n2022-12-31,\r\n2023-01-07,2850\r\n2023-01-14,\r\n2023-01-21,2500\r\n2023-01-28,\r\n2023-02-04,425\r\n2023-02-11,\r\n2023-02-18,\r\n2023-02-25,460\r\n2023-03-04,400\r\n2023-03-11,\r\n2023-03-18,\r\n2023-03-25,350\r\n2023-04-01,\r\n2023-04-08,500\r\n2023-04-15,\r\n2023-04-22,325\r\n2023-04-29,\r\n2023-05-06,300\r\n2023-05-13,\r\n2023-05-20,\r\n2023-05-27,375\r\n2023-06-03,300\r\n2023-06-10,\r\n2023-06-17,325\r\n2023-06-24,\r\n2023-07-01,500\r\n2023-07-08,800\r\n2023-07-15,\r\n2023-07-22,\r\n2023-07-29,400\r\n2023-08-05,\r\n2023-08-12,\r\n2023-08-19,200\r\n2023-08-26,\r\n2023-09-02,250\r\n2023-09-09,175\r\n2023-09-16,\r\n2023-09-23,325\r\n2023-09-30,\r\n2023-10-07,\r\n2023-10-14,200\r\n2023-10-21,\r\n2023-10-28,\r\n2023-11-04,\r\n2023-11-11,\r\n2023-11-18,\r\n2023-11-25,\r\n2023-12-02,\r\n2023-12-09,"
		},
		{
			"name": "data_0",
			"source": "pda",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"previous_sum\"]) && isFinite(+datum[\"previous_sum\"])"
				}
			]
		},
		{
			"name": "data_1",
			"source": "pda",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum\"]) && isFinite(+datum[\"sum\"])"
				}
			]
		},
		{
			"name": "data_2",
			"source": "pda",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum_inc\"]) && isFinite(+datum[\"sum_inc\"])"
				}
			]
		},
		{
			"name": "data_3",
			"source": "pda",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum_dec\"]) && isFinite(+datum[\"sum_dec\"])"
				}
			]
		}
	],
	"signals": [
		{
			"name": "width",
			"init": "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
			"on": [
				{
					"update": "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
					"events": "window:resize"
				}
			]
		},
		{
			"name": "height",
			"init": "isFinite(containerSize()[1]) ? containerSize()[1] : 200",
			"on": [
				{
					"update": "isFinite(containerSize()[1]) ? containerSize()[1] : 200",
					"events": "window:resize"
				}
			]
		}
	],
	"marks": [
		{
			"name": "layer_0_marks",
			"type": "rect",
			"style": [
				"bar"
			],
			"from": {
				"data": "data_0"
			},
			"encode": {
				"update": {
					"fill": [
						{
							"test": "indexof([\"Begin\",\"End\"], datum[\"datum.label\"]) !== -1",
							"value": "#f7e0b6"
						},
						{
							"test": "datum.sum < datum.previous_sum",
							"value": "#f78a64"
						},
						{
							"value": "#93c4aa"
						}
					],
					"ariaRoleDescription": {
						"value": "bar"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b-%y')) + \"; Amount: \" + (format(datum[\"previous_sum\"], \"$\")) + \"; sum: \" + (format(datum[\"sum\"], \"\"))"
					},
					"xc": {
						"scale": "x",
						"field": "label"
					},
					"width": {
						"value": 40
					},
					"y": {
						"scale": "y",
						"field": "previous_sum"
					},
					"y2": {
						"scale": "y",
						"field": "sum"
					}
				}
			}
		},
		{
			"name": "layer_1_marks",
			"type": "rule",
			"style": [
				"rule"
			],
			"from": {
				"data": "data_1"
			},
			"encode": {
				"update": {
					"opacity": {
						"value": 1
					},
					"strokeWidth": {
						"value": 1.5
					},
					"stroke": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b-%y')) + \"; sum: \" + (format(datum[\"sum\"], \"$\")) + \"; lead: \" + (timeFormat(datum[\"lead\"], '%b %d, %Y'))"
					},
					"x": {
						"scale": "x",
						"field": "label",
						"offset": -20
					},
					"x2": {
						"scale": "x",
						"field": "lead",
						"offset": 20
					},
					"y": {
						"scale": "y",
						"field": "sum"
					}
				}
			}
		},
		{
			"name": "layer_2_marks",
			"type": "text",
			"style": [
				"text"
			],
			"from": {
				"data": "data_2"
			},
			"encode": {
				"update": {
					"baseline": {
						"value": "bottom"
					},
					"dy": {
						"value": -4
					},
					"fontSize": {
						"value": 14
					},
					"fill": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b-%y')) + \"; sum_inc: \" + (format(datum[\"sum_inc\"], \"$\")) + \"; text_amount: \" + (isValid(datum[\"text_amount\"]) ? datum[\"text_amount\"] : \"\"+datum[\"text_amount\"])"
					},
					"x": {
						"scale": "x",
						"field": "label"
					},
					"y": {
						"scale": "y",
						"field": "sum_inc"
					},
					"text": {
						"signal": "isValid(datum[\"text_amount\"]) ? datum[\"text_amount\"] : \"\"+datum[\"text_amount\"]"
					},
					"align": {
						"value": "center"
					}
				}
			}
		},
		{
			"name": "layer_3_marks",
			"type": "text",
			"style": [
				"text"
			],
			"from": {
				"data": "data_3"
			},
			"encode": {
				"update": {
					"baseline": {
						"value": "top"
					},
					"dy": {
						"value": 4
					},
					"fill": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b-%y')) + \"; sum_dec: \" + (format(datum[\"sum_dec\"], \"$\"))"
					},
					"x": {
						"scale": "x",
						"field": "label"
					},
					"y": {
						"scale": "y",
						"field": "sum_dec"
					},
					"text": {
						"signal": "isValid(datum[\"sum_dec\"]) ? datum[\"sum_dec\"] : \"\"+datum[\"sum_dec\"]"
					},
					"align": {
						"value": "center"
					}
				}
			}
		}
	],
	"scales": [
		{
			"name": "x",
			"type": "time",
			"domain": {
				"fields": [
					{
						"data": "data_0",
						"field": "label"
					},
					{
						"data": "data_1",
						"field": "label"
					},
					{
						"data": "data_1",
						"field": "lead"
					},
					{
						"data": "data_2",
						"field": "label"
					},
					{
						"data": "data_3",
						"field": "label"
					}
				]
			},
			"range": [
				0,
				{
					"signal": "width"
				}
			],
			"padding": 5
		},
		{
			"name": "y",
			"type": "linear",
			"domain": {
				"fields": [
					{
						"data": "data_0",
						"field": "previous_sum"
					},
					{
						"data": "data_0",
						"field": "sum"
					},
					{
						"data": "data_1",
						"field": "sum"
					},
					{
						"data": "data_2",
						"field": "sum_inc"
					},
					{
						"data": "data_3",
						"field": "sum_dec"
					}
				]
			},
			"range": [
				{
					"signal": "height"
				},
				0
			],
			"nice": true,
			"zero": true
		}
	],
	"axes": [
		{
			"scale": "y",
			"orient": "left",
			"tickCount": 5,
			"gridScale": "x",
			"grid": true,
			"domain": false,
			"labels": false,
			"aria": false,
			"maxExtent": 0,
			"minExtent": 0,
			"ticks": false,
			"zindex": 0
		},
		{
			"scale": "x",
			"orient": "bottom",
			"grid": false,
			"format": "%b-%y",
			"labelAngle": 0,
			"labelFontSize": 15,
			"tickCount": {
				"interval": "month",
				"step": 2
			},
			"labelBaseline": "top",
			"labelFlush": true,
			"labelOverlap": true,
			"zindex": 0
		},
		{
			"scale": "y",
			"orient": "left",
			"grid": false,
			"format": "$",
			"labelAngle": 0,
			"labelFontSize": 15,
			"tickCount": 5,
			"labelAlign": "right",
			"labelOverlap": true,
			"encode": {
				"labels": {
					"update": {
						"text": {
							"signal": "datum.label + 'B'"
						}
					}
				}
			},
			"zindex": 0
		}
	],
	"config": {
		"style": {
			"text": {
				"fontWeight": "bold"
			}
		}
	}
}