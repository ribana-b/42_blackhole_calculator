import math
import sys

xp_required = {
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

project = {
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

def calculateBH(current_level, project_name, project_score, bonus_coalition):
    current_xp = xp_required[int(current_level) + 1][0] * (current_level - int(current_level)) + xp_required[int(current_level)][1];
    xp_received = project[project_name] * (project_score / 100);
    if bonus_coalition:
        xp_received += xp_received * 0.042;
    new_xp = current_xp + xp_received;
    days = int(((new_xp/49980)**0.45 - (current_xp/49980)**0.45) * 483);
    for levels in xp_required:
        if (new_xp - xp_required[levels][1] <= 0):
            new_level = levels - 1 + math.floor((new_xp - xp_required[levels - 1][1]) / xp_required[levels][0] * 100)/100;
            break
    new_level = round(new_level * 100) / 100;
    print("Project " + project_name + " gives " + str(days) + " days")
    print(str(current_level) + " -> " + str(new_level) + " XP")

def calculateBlackHoleDays(current_level = None, project_name = None, project_score = None, bonus_coalition = None):
    try:
        if current_level == None:
            current_level = float(input("Introduce your level: "));
        if project_name == None:
            project_name = input("Introduce the project: ");
        if project_score == None:
            project_score = int(input("Introduce the project score: "));
        if bonus_coalition == None:
            bonus_coalition = input("Bonus coalition? (y/n): ");
        bonus_coalition.lower();
        if bonus_coalition == "y":
            bonus_coalition = True;
        else:
            bonus_coalition = False;
        calculateBH(current_level, project_name, project_score, bonus_coalition);
    except:
        print("Something failed");

if __name__ == "__main__":
    if len(sys.argv) == 5:
        calculateBlackHoleDays(float(sys.argv[1]), sys.argv[2], int(sys.argv[3]), sys.argv[4]);
    else:
        calculateBlackHoleDays();
