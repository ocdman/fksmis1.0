USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_get_real_data]    Script Date: 07/24/2014 10:30:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<fengxiao>
-- Create date: <2014-06-28>
-- Description:	<查询分拣表数据>
-- =============================================
CREATE PROCEDURE [dbo].[pro_get_real_data]
	-- Add the parameters for the stored procedure here
	@table_name varchar(20), --分拣表名称
	@datetime datetime,      --从何时开始
	@maxCount int = 2        --top的条目数
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	declare @sql nvarchar(max),@ProbeID int,@isDelete bit;
	
	IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[temp]') AND type in (N'U'))
	DROP TABLE [dbo].[temp]

	--取得不同的probeid放入临时表
	--CREATE TABLE #temp (ProbeID INT);
	label1:begin
		IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
			begin
				select * from DataAnalyse;
				return;
			end
			
		set @sql = N'select distinct ProbeID into temp from '+@table_name;
		set @isDelete=1;
		EXECUTE sp_executesql @sql;
		
		--查询数据用union联合
		
		set @sql='';

		Declare cur_Depart Cursor
			For Select ProbeID From temp 
			--创建游标
		Open cur_Depart
			--移动或提取列值
			Fetch From cur_Depart into @ProbeID
			--利用循环处理游标中的列值
		While @@Fetch_Status=0
			Begin
				if @sql<> ''
					begin
						set @sql = @sql + N' union ';
					end

				set @sql = @sql + N' SELECT top '+cast(@maxCount as varchar(10))+ ' @isDelete as IsDeleted, getdate() as AddDate, id,ProbeID,TimeUp,TimeGet,YouYanND,YouYanWD,YouYanSD,ZTjhq,ZTfj,ZTsb,ZTqd,null as ZTfjCount,null as ZTjhqCount FROM ' + @table_name;	
				set @sql = @sql + N' where timeup > @datetime and probeid='+ cast(@ProbeID as varchar(max));
				--set @sql = @sql + N' order by timeup desc';
				
				Fetch From cur_Depart into @ProbeID
			End
			--关闭/释放游标
		Close cur_Depart
		Deallocate cur_Depart 

		print @sql;
		set @sql = @sql + N' order by probeid,timeup ';
		
		EXEC sp_executesql  @sql,
							   N'@datetime datetime,@isDelete bit',   
							   @datetime,@isDelete
	end
END





GO

