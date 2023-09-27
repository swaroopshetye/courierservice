CREATE TABLE Delivery_Personnel
(
	[personnel_id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[location] varchar(100) NOT NULL, 
    CONSTRAINT [FK_Delivery_Personnel_To_User_Info] FOREIGN KEY ([personnel_id]) REFERENCES [User_Info]([user_id]),

)
