using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CBT_Backend.Migrations
{
    public partial class createdModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Course_Id",
                table: "Assessments",
                newName: "CourseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Assessments",
                newName: "Course_Id");
        }
    }
}
