SET IDENTITY_INSERT [dbo].[Order] ON
INSERT INTO [dbo].[Order] ([order_id], [receiver_name], [receiver_email], [receiver_mobile], [receiver_address], [package_count], [amount], [status], [customer_id], [personnel_id]) VALUES (1, N'Shreejay', N'shreejaymane15@gmail.com', N'7756800471', N'Sangli', 3, 300, N'In Transit', 3, 6)
SET IDENTITY_INSERT [dbo].[Order] OFF
