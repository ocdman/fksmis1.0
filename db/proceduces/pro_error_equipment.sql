USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_error_equipment]    Script Date: 07/24/2014 10:29:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[pro_error_equipment]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @Id nvarchar(128),@NickName nvarchar(max),@Address nvarchar(max);
	DECLARE @Now datetime,@Sql nvarchar(max),@ProbeCount int;
	DECLARE @ztqd int,@ztsb int,@probeid int;
	set @Now = GETDATE();
	
	Declare cur_equipment Cursor
			For Select Id,NickName,Address From Equipment 
			--创建游标
		Open cur_equipment
			--移动或提取列值
			Fetch From cur_equipment into @Id,@NickName,@Address
			--利用循环处理游标中的列值
		While @@Fetch_Status=0
			Begin
				DECLARE @EID nvarchar(128);
				--print @Id;
				IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@Id) AND type in (N'U'))
					begin
						IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID('temp1') AND type in (N'U'))
							drop table temp1;
						set @Sql = N' select avg(ztqd) as ztqd,count(ztsb) as ztsb,probeid into temp1 from ' + @Id;
						set @Sql = @Sql + N' where datediff(minute,TimeUP,@Now)<=10';
						set @Sql = @Sql + N' group by probeid';
						set @Sql = @Sql + N' order by probeid';
						set @EID = @Id;
						
						EXEC sp_executesql  @sql,
							   N'@NickName nvarchar(max),@Address nvarchar(max),@Now datetime',   
							   @NickName,@Address,@Now;
						set @ProbeCount = 0;
						
						declare cur_fjb cursor
							for select ztqd,ztsb,probeid from temp1
						Open cur_fjb
								--移动或提取列值
						Fetch From cur_fjb into @ztqd,@ztsb,@probeid
								--利用循环处理游标中的列值
							While @@Fetch_Status=0
								Begin
									print @probeid;
									Fetch From cur_fjb into @ztqd,@ztsb,@probeid
								End
								--关闭/释放游标
							Close cur_fjb
							Deallocate cur_fjb 
							   
					end
				Fetch From cur_equipment into @Id,@NickName,@Address
			End
			--关闭/释放游标
		Close cur_equipment
		Deallocate cur_equipment 
	end


GO

