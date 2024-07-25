let index = 1;
let total_days = 0;

const xp_required = {
	0:  [0    , 0],
	1:  [462  , 462],
	2:  [2226 , 2668],
	3:  [3197 , 5885],
	4:  [5892 , 11777],
	5:  [17440, 29217],
	6:  [17038, 46255],
	7:  [17304, 63559],
	8:  [10781, 74340],
	9:  [11143, 85483],
	10: [9517 , 95000],
};

const project = {
	"libft":            462,
	"get_next_line":    882,
	"ft_printf":        882,
	"born2beroot":      577,
	"push_swap":        1855,
	"minitalk":         1142,
	"pipex":            1442,
	"so_long":          1000,
	"fract-ol":         1000,
	"fdf":              1000,
	"philosophers":     3360,
	"minishell":        2814,
	"cub3d":            5775,
	"minirt":           5775,
	"netpractice":      3160,
	"cpp04":            9660,
	"inception,":       10042,
	"webserv":          21630,
	"ft_irc":           21630,
	"cpp09":            10042,
	"ft_transcendence": 24360,
}

const temp = document.getElementById("blackhole_days");

function cloneForm(new_level) {
	const ogForm = document.getElementById("ogform");
	const container = document.getElementById("container");
	const newForm = document.createElement("form");
	newForm.id = "new-form";
	Array.from(ogForm.childNodes).forEach(node => {
		const newElement = node.cloneNode(true);
		newElement.value = "";
		if (newElement.id === "current_level") {
			newElement.id = `current_level_${index}`
			newElement.value = new_level;
		}
		else if (newElement.id === "project_name") {
			newElement.id = `project_name_${index}`;
		}
		else if (newElement.id === "projects") {
			newElement.id = `projects_${index}`;
		}
		else if (newElement.id === "project_score") {
			newElement.id = `project_score_${index}`;
			newElement.value = 100;
		}
		else if (newElement.id === "bonus_coalition") {
			newElement.id = `bonus_coalition_${index}`;
		}
		else {
			newElement.id = `temp_${index}`;
		}
		newForm.appendChild(newElement);
	})
	container.appendChild(newForm);
	index += 1;
}

function displayNewDays(project_name, days) {
	total_days += days;
	temp.innerHTML = `<p>Project ${project_name} gives: ${days} days</p>`;
	temp.innerHTML += `<p>Total days accumulated: ${total_days} days</p>`;
}

function calculateBH(current_level, project_name, project_score, bonus_coalition) {
	const current_xp = xp_required[parseInt(current_level) + 1][0] * (current_level - parseInt(current_level)) + xp_required[parseInt(current_level)][1];
	let xp_received = project[project_name] * (project_score / 100);
	if (bonus_coalition) {
		xp_received += xp_received * 0.042;
	}
	const new_xp = current_xp + xp_received;
	const days = parseInt(((new_xp/49980)**0.45 - (current_xp/49980)**0.45) * 483);
	let new_level;
	for (let levels in xp_required) {
		if (new_xp - xp_required[levels][1] <= 0) {
			new_level = levels - 1 + Math.floor((new_xp - xp_required[levels - 1][1]) / xp_required[levels][0] * 100)/100;
			break;
		}
	}
	new_level = Math.round(new_level * 100) / 100;
	displayNewDays(project_name, days);
	cloneForm(new_level);
}

function get_level() {
	let level = document.getElementById(`current_level_${index - 1}`);
	if (!level) {
		level = document.getElementById("current_level");
	}
	return (level);
}

function get_name() {
	let name = document.getElementById(`project_name_${index - 1}`);
	if (!name) {
		name = document.getElementById("project_name");
	}
	return (name);
}

function calculateBlackHoleDays() {
	const current_level = get_level().value;
	if (!current_level || current_level < 0 || current_level >= 10) {
		throw new Error("Error with current_level");
	}
	const project_name = get_name().value;
	if (!project.hasOwnProperty(project_name)) {
		throw new Error(`'${project_name}' does not exist`);
	}
	const project_score = document.getElementById("project_score").value;
	if (!project_score || project_score < 0 || project_score > 125) {
		throw new Error("Error with project_score");
	}
	const bonus_coalition = document.getElementById("bonus_coalition").checked;
	calculateBH(current_level, project_name, project_score, bonus_coalition);
}
