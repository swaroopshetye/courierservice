SET IDENTITY_INSERT [dbo].[Complaint] ON
INSERT INTO [dbo].[Complaint] ([complaint_id], [complaint], [status], [placed_date], [resolved_date], [order_id], [customer_id], [role_id]) VALUES (1, N'Not Satisfied', N'IN PROCESS', N'2023-08-25', NULL, 0, 7, 3)
INSERT INTO [dbo].[Complaint] ([complaint_id], [complaint], [status], [placed_date], [resolved_date], [order_id], [customer_id], [role_id]) VALUES (2, N'Courier not fetched', N'IN PROCESS', N'2023-08-25', NULL, 0, 7, 3)
INSERT INTO [dbo].[Complaint] ([complaint_id], [complaint], [status], [placed_date], [resolved_date], [order_id], [customer_id], [role_id]) VALUES (12, N'Order is not received', N'IN PROCESS', N'2023-08-26', NULL, 21, 3, 4)
INSERT INTO [dbo].[Complaint] ([complaint_id], [complaint], [status], [placed_date], [resolved_date], [order_id], [customer_id], [role_id]) VALUES (13, N'Order is not right', N'IN PROCESS', N'2023-08-28', NULL, 17, 3, 4)
INSERT INTO [dbo].[Complaint] ([complaint_id], [complaint], [status], [placed_date], [resolved_date], [order_id], [customer_id], [role_id]) VALUES (14, N'Delivery is very slow
', N'IN PROCESS', N'2023-08-28', NULL, 12, 3, 4)
SET IDENTITY_INSERT [dbo].[Complaint] OFF
