--
-- File generated with SQLiteStudio v3.2.1 on Sun Mar 14 15:33:56 2021
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: BUILDING_ACCESS
CREATE TABLE BUILDING_ACCESS(
Building_ID INT NOT NULL,
Building_date DATE NOT NULL,
Building_time TIME NOT NULL,
User_ID INT NOT NULL,
FOREIGN KEY(User_ID) references USERS(User_ID));

-- Table: COMPUTER_ACCESS
CREATE TABLE COMPUTER_ACCESS(
Terminal_ID INT NOT NULL,
Computer_date DATE,
Computer_time TIME,
User_ID INT NOT NULL,
PRIMARY KEY(Terminal_ID)
FOREIGN KEY(User_ID) references USERS(User_ID));

-- Table: COMPUTER_TERMINALS
CREATE TABLE COMPUTER_TERMINALS(
Terminal_ID INT NOT NULL,
Location VARCHAR(20) NOT NULL,
PRIMARY KEY(Terminal_ID)
FOREIGN KEY(Terminal_ID) references COMPUTER_ACCESS(Terminal_ID));

-- Table: QUESTIONNAIRE
CREATE TABLE QUESTIONNAIRE(
User_ID INT NOT NULL,
Favorite_food VARCHAR(30),
Favorite_drink VARCHAR(30),
Favorite_hobby VARCHAR(30),
PRIMARY KEY(User_ID)
FOREIGN KEY(User_ID) references USERS(User_ID));

-- Table: USER_INFO
CREATE TABLE USER_INFO(
User_ID INT NOT NULL,
First_name VARCHAR(20) NOT NULL,
Last_name VARCHAR(20) NOT NULL,
Superhero_Name VARCHAR(30),
PRIMARY KEY(User_ID)
FOREIGN KEY(User_ID) references USERS(User_ID));

-- Table: USERS
CREATE TABLE USERS(
User_ID INT NOT NULL,
Password VARCHAR(30) NOT NULL,
PRIMARY KEY(User_ID));

-- Table: PURCHASE_ORDERS
CREATE TABLE PURCHASE_ORDERS (
    PO_NUMBER     INT          NOT NULL,
    USER_ID       INT          NOT NULL,
    ITEM          VARCHAR (30) NOT NULL,
    COST          DOUBLE       NOT NULL,
    DATE_RECIEVED DATE,
    TIME_RECIEVED TIME,
    PRIMARY KEY (
        PO_NUMBER
    )
    FOREIGN KEY(User_ID) references USERS(User_ID))
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
