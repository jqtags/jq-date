###Attributes
|Tag| Attribute | Value | Default | Description |
|------|-----|------|---|
| jq-date |   value  |  text    | EMPTY_STRING |  value of date to set |
| jq-date |   format  |  text   | DD MMM YYYY |  format of date of date to set |


###Events
|Tag| Event Attribute | Event | Description |
|------|-----|-----|------|
| jq-date |onchange|change|  when date is selected/changed |

###jQuery Methods
|Tag| Method | Arguments | Returns | Description
|------|-----|-----|------|------|
| jq-date |val|  | string |  date in  DD MMM YYYY format|
| jq-date |val| string | |  sets the date of tag, accepts input in all the valid formats, also tenors like (1d,2m,5w,2y)





