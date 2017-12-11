function MemberController($stateParams, FamilyService) {
	const that   = this;
	that.message   = "";
	that.newMember = {};

	that.newMember = function(){
		FamilyService.newMember()
		.then(function (response) {
			// create user
		});
		return familles.member;
	};
};

export default MemberController;