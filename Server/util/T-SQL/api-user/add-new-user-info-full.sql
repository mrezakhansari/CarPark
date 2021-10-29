exec sp_AddNewUserInfo
    @FirstName = @firstName,
    @LastName = @lastName,
    @MobileNo = @mobileNo,
	@Email = @email,
	@UserType_ID = @userType,
	@Password = @password,
	@UserCode = @userCode,
	@Address = @address,
	@CreateUserID = @id