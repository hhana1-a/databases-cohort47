### Identifying the problem

Table has to contain only atomic and each record is unique.

food_code and food_description columns contain multiple values separated by commas. This violates 1NF. Also member with  id=1 repeats twice.

### How to fix this
Instead of putting everything in one table there has to be 6 tables.

1. Members

member_id
member_name
member_address
<br>

2. Dinners

dinner_id
dinner_date

<br>

3. Venues
venue_code
venue_description

<br>

4. Foods 
food_code
food_description

<br>

5. Member-Dinners

member_id
dinner_id

<br>

6. Dinner-Foods

dinner_id
food_code