CREATE TABLE Dispatcher
(
	[dispatcher_id] INT NOT NULL PRIMARY KEY,
	[hub_location] varchar(100) NOT NULL,
	CONSTRAINT [Fk_Dispatcher_TO_User_Info] FOREIGN KEY ([dispatcher_id]) REFERENCES [User_Info]([user_id])
)
