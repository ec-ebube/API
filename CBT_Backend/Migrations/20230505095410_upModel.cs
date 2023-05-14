using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CBT_Backend.Migrations
{
    public partial class upModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Options");

            migrationBuilder.AddColumn<string>(
                name: "Option_A",
                table: "Assessments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option_B",
                table: "Assessments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option_C",
                table: "Assessments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option_D",
                table: "Assessments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Option_A",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "Option_B",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "Option_C",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "Option_D",
                table: "Assessments");

            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AssessmentId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Option_A = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option_B = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option_C = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Option_D = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Options_Assessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "Assessments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Options_AssessmentId",
                table: "Options",
                column: "AssessmentId");
        }
    }
}
