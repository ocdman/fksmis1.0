USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_getInterval_data]    Script Date: 07/24/2014 10:30:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		fengxiao
-- Create date: 2014-07-02
-- Description:	取得一段时间内的间隔数据
-- =============================================
CREATE PROCEDURE [dbo].[pro_getInterval_data] 
	@table_name varchar(20),
	@start_time datetime,
	@end_time datetime,
	@interval int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max);
	    
	    IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
		begin
			select * from DataAnalyse;
			return;
		end
	    
		set @sql = N' SELECT cast(1 as bit) as IsDeleted, getdate() as AddDate, id,ProbeID,TimeUp,TimeGet,YouYanND,YouYanWD,YouYanSD,ZTjhq,ZTfj,ZTsb,ZTqd,null as ZTfjCount,null as ZTjhqCount FROM ' + @table_name;
		set @sql = @sql + N' where TimeUP between @start_time and @end_time';
		set @sql = @sql + N' and datediff(minute,@start_time,TimeUP) % @interval = 0';
		
		print @sql;
		
		EXEC sp_executesql  @sql,
							N'@start_time datetime,@end_time datetime,@interval int',   
							@start_time,@end_time,@interval
	end
END

GO

