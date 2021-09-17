exec sp_AddNewUserInfo
    @FirstName = @firstName,
    @LastName NVARCHAR(50) = '',
    @MobileNo NVARCHAR(11) = '',
	@Email NVARCHAR(50) = '',
	@UserType_ID INT = null,
	@Password NVARCHAR(MAX) = '',
	@UserCode NVARCHAR(50) = ''