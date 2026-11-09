import json
import random
import time
import math
import sys

# Test the core matching algorithm extracted from bundle.js
def simulate_matching(restaurants, p1_selections, p2_selections, p1_veto, p2_veto, p1_superlike, p2_superlike, avoid_last_winner, last_winner_id):
    # Rule: Superlike gives double weight or priority
    # Rule: Veto eliminates from candidates unless both veto same or special tiebreaker
    # Rule: Direct matches are intersection of selections minus vetos
    
    # 1. Filter out vetos
    vetos = set()
    if p1_veto: vetos.add(p1_veto)
    if p2_veto: vetos.add(p2_veto)
    
    # Matches (intersection)
    matches = [r for r in p1_selections if r in p2_selections and r not in vetos]
    
    # Check if avoidLastWinner applies
    if avoid_last_winner and last_winner_id:
        matches_without_last = [r for r in matches if r != last_winner_id]
        if len(matches_without_last) > 0:
            matches = matches_without_last
            
    # Priority if superlike in matches
    superlikes = set()
    if p1_superlike: superlikes.add(p1_superlike)
    if p2_superlike: superlikes.add(p2_superlike)
    
    super_matches = [r for r in matches if r in superlikes]
    
    return {
        "matches": matches,
        "super_matches": super_matches,
        "vetos": list(vetos),
        "total_matches": len(matches)
    }

print("Simulating 5,000 voting sessions...")

catalog_ids = [f"rest-{i}" for i in range(1, 35)]
results = {
    "total_sessions": 5000,
    "direct_matches": 0,
    "super_matches": 0,
    "ties_2_or_more": 0,
    "zero_matches_roulette_needed": 0,
    "both_vetoed_same": 0,
    "vetoed_favorite": 0,
    "edge_cases": []
}

for i in range(5000):
    # Random selection sizes (0 to 10 choices)
    p1_count = random.randint(1, 8)
    p2_count = random.randint(1, 8)
    
    p1_sel = set(random.sample(catalog_ids, p1_count))
    p2_sel = set(random.sample(catalog_ids, p2_count))
    
    p1_veto = random.choice(list(p1_sel)) if random.random() < 0.3 else None
    p2_veto = random.choice(list(p2_sel)) if random.random() < 0.3 else None
    
    p1_super = random.choice(list(p1_sel)) if random.random() < 0.4 else None
    p2_super = random.choice(list(p2_sel)) if random.random() < 0.4 else None
    
    avoid_last = random.random() < 0.2
    last_w = random.choice(catalog_ids) if avoid_last else None
    
    res = simulate_matching(catalog_ids, p1_sel, p2_sel, p1_veto, p2_veto, p1_super, p2_super, avoid_last, last_w)
    
    if p1_veto and p2_veto and p1_veto == p2_veto:
        results["both_vetoed_same"] += 1
        
    if res["total_matches"] == 0:
        results["zero_matches_roulette_needed"] += 1
    elif res["total_matches"] == 1:
        results["direct_matches"] += 1
    else:
        results["ties_2_or_more"] += 1
        
    if len(res["super_matches"]) > 0:
        results["super_matches"] += 1

print(f"Done 5,000 simulations:")
print(f"  - 0 Coincidencias (Ruleta necesaria): {results['zero_matches_roulette_needed']} ({results['zero_matches_roulette_needed']/50:.1f}%)")
print(f"  - 1 Ganador Directo: {results['direct_matches']} ({results['direct_matches']/50:.1f}%)")
print(f"  - Empate (>= 2 Coincidencias): {results['ties_2_or_more']} ({results['ties_2_or_more']/50:.1f}%)")
print(f"  - Con Superlike coincidente: {results['super_matches']} ({results['super_matches']/50:.1f}%)")
print(f"  - Ambos vetaron el mismo: {results['both_vetoed_same']}")
